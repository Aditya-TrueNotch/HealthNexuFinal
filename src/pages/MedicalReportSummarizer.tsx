import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText, Brain, AlertTriangle, CheckCircle, Clock, X, Trash2 } from 'lucide-react';

interface MedicalAnalysis {
  id: string;
  report_filename: string;
  analysis_summary: string;
  key_findings: string[];
  recommendations: string[];
  severity_level: string;
  created_at: string;
}

const MedicalReportSummarizer = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analyses, setAnalyses] = useState<MedicalAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAnalyses();
    }
  }, [user]);

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_report_analyses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      toast({
        title: "Error",
        description: "Failed to load medical report analyses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, text file, or image (JPG, PNG)",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleFileReset = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medical_report_analyses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Analysis Deleted",
        description: "Medical report analysis has been removed",
      });
      
      fetchAnalyses();
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the analysis",
        variant: "destructive",
      });
    }
  };

  const uploadFileToStorage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user!.id}/${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('medical-reports')
      .upload(fileName, file);

    if (uploadError) throw uploadError;
    
    return fileName;
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
      } else {
        // For PDF and images, we'll return empty string and let the backend handle it
        resolve('');
      }
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !user) return;

    setIsAnalyzing(true);
    try {
      let reportText = '';
      let storagePath = '';

      // For text files, extract text directly
      if (selectedFile.type === 'text/plain') {
        reportText = await extractTextFromFile(selectedFile);
      } else {
        // For PDF and images, upload to storage
        storagePath = await uploadFileToStorage(selectedFile);
      }

      // Call the edge function to analyze the report
      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportText,
          storagePath,
          fileType: selectedFile.type,
          fileName: selectedFile.name,
          userId: user.id
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Analysis Complete",
          description: "Your medical report has been analyzed successfully",
        });
        setSelectedFile(null);
        // Reset the file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        fetchAnalyses();
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing report:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze the medical report",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return CheckCircle;
      case 'medium': return Clock;
      case 'high': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Medical Report Summarizer
            </h1>
            <p className="text-muted-foreground">
              Upload medical reports for AI-powered analysis and insights
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Medical Report Analysis
            </CardTitle>
            <CardDescription>
              Upload your medical reports (PDF, images, or text files) for comprehensive AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.txt,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {selectedFile ? selectedFile.name : 'Choose a medical report to analyze'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, text files, and images (JPG, PNG) up to 10MB
                </p>
              </label>
            </div>
            
            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <Badge variant="outline">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleFileReset}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4" />
                        Analyze Report
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Previous Analyses</h2>
          
          {analyses.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No analyses yet</h3>
                <p className="text-muted-foreground">
                  Upload your first medical report to get AI-powered insights
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {analyses.map((analysis) => {
                const SeverityIcon = getSeverityIcon(analysis.severity_level);
                return (
                  <Card key={analysis.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {analysis.report_filename}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="gap-1">
                            <SeverityIcon className={`h-3 w-3 ${getSeverityColor(analysis.severity_level)}`} />
                            {analysis.severity_level}
                          </Badge>
                          <Badge variant="secondary">
                            {new Date(analysis.created_at).toLocaleDateString()}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(analysis.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Executive Summary</h4>
                        <p className="text-sm text-muted-foreground">{analysis.analysis_summary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Key Findings</h4>
                        <ul className="space-y-1">
                          {analysis.key_findings.map((finding, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Recommendations</h4>
                        <ul className="space-y-1">
                          {analysis.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="h-1.5 w-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReportSummarizer;