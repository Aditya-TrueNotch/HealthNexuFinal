import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Bell, Pill, Calendar, Activity, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SmartNotifications = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleGenerateNotifications = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('smart-notifications', {
        body: {
          userProfile: { age: 30, goals: 'health maintenance' },
          preferences: { time: 'morning' }
        }
      });

      if (error) throw error;
      
      if (Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      }
      toast.success('Smart notifications generated');
    } catch (error) {
      console.error('Error generating notifications:', error);
      toast.error('Failed to generate notifications');
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
              Smart Notifications
            </h1>
            <p className="text-muted-foreground">
              Customize your health reminders and alerts
            </p>
          </div>
        </div>

        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Pill className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Medication Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified when it's time to take medicine</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Appointment Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for upcoming appointments</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Health Tips</p>
                  <p className="text-sm text-muted-foreground">Daily personalized health recommendations</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>AI-Powered Notifications</CardTitle>
            <CardDescription>
              Generate personalized health tips and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={handleGenerateNotifications}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Smart Notifications'
              )}
            </Button>
            {notifications.length > 0 && (
              <div className="space-y-3 mt-4">
                {notifications.map((notif, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                    <p className="text-xs text-primary mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartNotifications;
