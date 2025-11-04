import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, AlertTriangle, Phone, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SymptomChecker = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      toast.error('Please describe your symptoms');
      return;
    }

    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('symptom-checker', {
        body: { symptoms }
      });

      if (error) throw error;
      setAnalysis(data.analysis);
      toast.success('Analysis complete');
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast.error('Failed to analyze symptoms');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Symptom Checker & Emergency
            </h1>
            <p className="text-muted-foreground">
              AI-powered symptom analysis with emergency response
            </p>
          </div>
        </div>

        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Describe Your Symptoms
            </CardTitle>
            <CardDescription>
              Enter your symptoms below for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe your symptoms in detail..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={6}
            />
            <Button 
              className="w-full" 
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </Button>
            {analysis && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Analysis Results:</h3>
                <div className="whitespace-pre-wrap text-sm">{analysis}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Phone className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">In case of emergency, call:</p>
            <Button variant="destructive" className="w-full" asChild>
              <a href="tel:112">Call Emergency Services - 112</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;