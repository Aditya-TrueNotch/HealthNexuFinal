import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Pill, 
  FileText, 
  Stethoscope, 
  Users, 
  Apple, 
  Activity, 
  Heart, 
  Shield,
  Bell,
  MessageCircle,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const features = [
    {
      title: "Medication Reminder",
      description: "Scan prescriptions and get automated reminders",
      icon: Pill,
      status: "Available",
      bgColor: "bg-primary",
      textColor: "text-white"
    },
    {
      title: "Medical Report Summarizer",
      description: "Upload reports for AI-powered summaries",
      icon: FileText,
      status: "Available",
      bgColor: "bg-success",
      textColor: "text-white"
    },
    {
      title: "Symptom Checker & Emergency",
      description: "Analyze symptoms with AI emergency response",
      icon: Stethoscope,
      status: "Available",
      bgColor: "bg-destructive",
      textColor: "text-white"
    },
    {
      title: "Doctor & Lab Integration",
      description: "Find nearby doctors and verified specialists",
      icon: Users,
      status: "Available",
      bgColor: "bg-accent-teal",
      textColor: "text-white"
    },
    {
      title: "Nutrition & Diet Planner",
      description: "Personalized meal plans based on health data",
      icon: Apple,
      status: "Available",
      bgColor: "bg-primary",
      textColor: "text-white"
    },
    {
      title: "Chronic Disease Risk Prediction",
      description: "AI-powered risk analysis for early prevention",
      icon: Activity,
      status: "Available",
      bgColor: "bg-success",
      textColor: "text-white"
    },
    {
      title: "Digital First Aid",
      description: "Emergency guidance and ASHA worker connection",
      icon: Heart,
      status: "Available",
      bgColor: "bg-destructive",
      textColor: "text-white"
    },
    {
      title: "Health Dashboard",
      description: "Unified view of all your health data",
      icon: Shield,
      status: "Available",
      bgColor: "bg-primary",
      textColor: "text-white"
    },
    {
      title: "Smart Notifications",
      description: "Reminders and health tips tailored for you",
      icon: Bell,
      status: "Available",
      bgColor: "bg-accent-teal",
      textColor: "text-white"
    },
    {
      title: "AI Health Assistant",
      description: "Chat with AI for health questions and guidance",
      icon: MessageCircle,
      status: "Available",
      bgColor: "bg-success",
      textColor: "text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Health Nexus Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Medicines</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Pill className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Score</p>
                  <p className="text-2xl font-bold">0%</p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Alerts</p>
                  <p className="text-2xl font-bold">None</p>
                </div>
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Appointment</p>
                  <p className="text-sm font-medium">None</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${feature.bgColor} ${feature.textColor} shadow-lg`}>
                        <feature.icon className="h-6 w-6" strokeWidth={2.5} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={() => {
                        const routes: Record<string, string> = {
                          "Medication Reminder": "/medication-reminder",
                          "Medical Report Summarizer": "/medical-report-summarizer",
                          "Symptom Checker & Emergency": "/symptom-checker",
                          "Doctor & Lab Integration": "/doctor-lab-integration",
                          "Nutrition & Diet Planner": "/nutrition-planner",
                          "Chronic Disease Risk Prediction": "/chronic-disease-predictor",
                          "Digital First Aid": "/digital-first-aid",
                          "Health Dashboard": "/health-dashboard-view",
                          "Smart Notifications": "/smart-notifications",
                          "AI Health Assistant": "/ai-chat"
                        };
                        const route = routes[feature.title];
                        if (route) navigate(route);
                      }}
                    >
                      Access Feature
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;