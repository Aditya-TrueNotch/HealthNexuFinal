import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, Users, Building, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const DoctorLabIntegration = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [guidance, setGuidance] = useState('');

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSearch = async (searchType: string) => {
    if (!location.trim()) {
      toast.error('Please enter your location');
      return;
    }

    setSearching(true);
    setGuidance('');
    try {
      const { data, error } = await supabase.functions.invoke('find-doctors-labs', {
        body: { searchType, location, specialty }
      });

      if (error) throw error;
      setGuidance(data.guidance);
      toast.success('Search guidance generated');
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Failed to generate guidance');
    } finally {
      setSearching(false);
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
              Doctor & Lab Integration
            </h1>
            <p className="text-muted-foreground">
              Find nearby doctors and verified specialists
            </p>
          </div>
        </div>

        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle>Search Criteria</CardTitle>
            <CardDescription>Enter your location and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city or area"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty (Optional)</Label>
              <Input
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="e.g., Cardiologist, Dermatologist"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Button 
            className="w-full" 
            onClick={() => handleSearch('doctors')}
            disabled={searching}
          >
            {searching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Find Doctors
              </>
            )}
          </Button>
          <Button 
            className="w-full" 
            onClick={() => handleSearch('labs')}
            disabled={searching}
          >
            {searching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Building className="mr-2 h-4 w-4" />
                Find Labs
              </>
            )}
          </Button>
        </div>

        {guidance && (
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Search Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm">{guidance}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorLabIntegration;
