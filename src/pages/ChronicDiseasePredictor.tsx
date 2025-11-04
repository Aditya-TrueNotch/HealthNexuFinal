import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Activity, Heart, Brain, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ChronicDiseasePredictor = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState('');
  const [healthData, setHealthData] = useState({
    age: '',
    weight: '',
    height: '',
    bloodPressure: '',
    cholesterol: '',
    bloodSugar: ''
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleAnalyze = async (riskType: string) => {
    if (!healthData.age || !healthData.weight || !healthData.height) {
      toast.error('Please fill in basic health data');
      return;
    }

    setAnalyzing(true);
    setAssessment('');
    try {
      const { data, error } = await supabase.functions.invoke('predict-disease-risk', {
        body: { riskType, healthData }
      });

      if (error) throw error;
      setAssessment(data.assessment);
      toast.success('Risk assessment complete');
    } catch (error) {
      console.error('Error analyzing risk:', error);
      toast.error('Failed to analyze risk');
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
              Chronic Disease Risk Prediction
            </h1>
            <p className="text-muted-foreground">
              AI-powered risk analysis for early prevention
            </p>
          </div>
        </div>

        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
            <CardDescription>
              Analyze your health data for chronic disease risks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={healthData.age}
                  onChange={(e) => setHealthData({ ...healthData, age: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => setHealthData({ ...healthData, weight: e.target.value })}
                  placeholder="70"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={healthData.height}
                  onChange={(e) => setHealthData({ ...healthData, height: e.target.value })}
                  placeholder="170"
                />
              </div>
              <div>
                <Label htmlFor="bp">Blood Pressure</Label>
                <Input
                  id="bp"
                  value={healthData.bloodPressure}
                  onChange={(e) => setHealthData({ ...healthData, bloodPressure: e.target.value })}
                  placeholder="120/80"
                />
              </div>
              <div>
                <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                <Input
                  id="cholesterol"
                  type="number"
                  value={healthData.cholesterol}
                  onChange={(e) => setHealthData({ ...healthData, cholesterol: e.target.value })}
                  placeholder="200"
                />
              </div>
              <div>
                <Label htmlFor="sugar">Blood Sugar (mg/dL)</Label>
                <Input
                  id="sugar"
                  type="number"
                  value={healthData.bloodSugar}
                  onChange={(e) => setHealthData({ ...healthData, bloodSugar: e.target.value })}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="w-full" 
                onClick={() => handleAnalyze('Cardiovascular')}
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Analyze Cardiovascular Risk
                  </>
                )}
              </Button>
              <Button 
                className="w-full" 
                onClick={() => handleAnalyze('Diabetes')}
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Diabetes Risk
                  </>
                )}
              </Button>
            </div>

            {assessment && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Risk Assessment:</h3>
                <div className="whitespace-pre-wrap text-sm">{assessment}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChronicDiseasePredictor;
