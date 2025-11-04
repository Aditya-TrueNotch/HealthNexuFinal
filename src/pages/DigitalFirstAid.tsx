import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Heart, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const DigitalFirstAid = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [situation, setSituation] = useState('');
  const [guidance, setGuidance] = useState('');
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleGetGuidance = async () => {
    if (!situation.trim()) {
      toast.error('Please describe the emergency situation');
      return;
    }

    setLoading2(true);
    try {
      const { data, error } = await supabase.functions.invoke('digital-first-aid', {
        body: { situation }
      });

      if (error) throw error;
      setGuidance(data.guidance);
      toast.success('First aid guidance generated');
    } catch (error) {
      console.error('Error getting guidance:', error);
      toast.error('Failed to generate guidance');
    } finally {
      setLoading2(false);
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
              Digital First Aid
            </h1>
            <p className="text-muted-foreground">
              Emergency guidance and ASHA worker connection
            </p>
          </div>
        </div>

        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Describe the Emergency
            </CardTitle>
            <CardDescription>
              Provide details about the emergency situation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe the emergency situation in detail..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              rows={6}
            />
            <Button 
              className="w-full" 
              onClick={handleGetGuidance}
              disabled={loading2}
            >
              {loading2 ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Guidance...
                </>
              ) : (
                'Get First Aid Guidance'
              )}
            </Button>
            {guidance && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">First Aid Instructions:</h3>
                <div className="whitespace-pre-wrap text-sm">{guidance}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Emergency Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="destructive" className="w-full" asChild>
              <a href="tel:112">
                <Phone className="h-4 w-4 mr-2" />
                Call 112 - Emergency
              </a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:108">
                <Phone className="h-4 w-4 mr-2" />
                Call 108 - Ambulance
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalFirstAid;
