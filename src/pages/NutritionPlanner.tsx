import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Apple, Utensils, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const NutritionPlanner = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState('');
  const [planType, setPlanType] = useState('');
  const [userProfile, setUserProfile] = useState({
    age: '',
    weight: '',
    height: '',
    goal: '',
    dietary: ''
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleGeneratePlan = async (type: string) => {
    if (!userProfile.age || !userProfile.weight || !userProfile.height || !userProfile.goal) {
      toast.error('Please fill in all required fields');
      return;
    }

    setGenerating(true);
    setPlan('');
    setPlanType(type);
    try {
      const { data, error } = await supabase.functions.invoke('plan-nutrition', {
        body: { planType: type, userProfile }
      });

      if (error) throw error;
      setPlan(data.plan);
      toast.success('Nutrition plan generated');
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error('Failed to generate plan');
    } finally {
      setGenerating(false);
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
              Nutrition & Diet Planner
            </h1>
            <p className="text-muted-foreground">
              Personalized meal plans based on your health data
            </p>
          </div>
        </div>

        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Enter your details for personalized nutrition plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({ ...userProfile, age: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile({ ...userProfile, weight: e.target.value })}
                  placeholder="70"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={userProfile.height}
                  onChange={(e) => setUserProfile({ ...userProfile, height: e.target.value })}
                  placeholder="170"
                />
              </div>
              <div>
                <Label htmlFor="goal">Goal</Label>
                <Select value={userProfile.goal} onValueChange={(value) => setUserProfile({ ...userProfile, goal: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="weight-gain">Weight Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="dietary">Dietary Preferences (Optional)</Label>
                <Input
                  id="dietary"
                  value={userProfile.dietary}
                  onChange={(e) => setUserProfile({ ...userProfile, dietary: e.target.value })}
                  placeholder="e.g., Vegetarian, Vegan, No restrictions"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Button 
            className="w-full" 
            onClick={() => handleGeneratePlan('Daily')}
            disabled={generating}
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Apple className="mr-2 h-4 w-4" />
                Generate Daily Plan
              </>
            )}
          </Button>
          <Button 
            className="w-full" 
            onClick={() => handleGeneratePlan('Weekly')}
            disabled={generating}
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Utensils className="mr-2 h-4 w-4" />
                Generate Weekly Plan
              </>
            )}
          </Button>
        </div>

        {plan && (
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>{planType} Nutrition Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm">{plan}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NutritionPlanner;
