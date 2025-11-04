import { 
  Pill, 
  FileText, 
  AlertTriangle, 
  Stethoscope, 
  Apple, 
  Activity, 
  Cross, 
  BarChart3, 
  Bell 
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Pill,
    title: "Medication Reminder",
    description: "Smart OCR prescription scanning with automated reminders and missed dose alerts. Never forget your medications again.",
    color: "text-primary",
    bgColor: "bg-primary-soft"
  },
  {
    icon: FileText,
    title: "Medical Report Summarizer",
    description: "AI-powered analysis of lab reports and discharge summaries. Get easy-to-understand summaries for patients and structured formats for doctors.",
    color: "text-accent-teal",
    bgColor: "bg-accent-teal/10"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Assistant",
    description: "Intelligent symptom analysis with severity classification. Auto-dials emergency services, shares location, and notifies family in critical cases.",
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    icon: Stethoscope,
    title: "Doctor & Lab Integration",
    description: "Find nearest verified specialists, book online consultations, locate labs and pharmacies. Seamless report sharing with healthcare providers.",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: Apple,
    title: "Nutrition & Diet Planner",
    description: "Personalized meal plans based on your health condition, medical history, and lifestyle. Featuring locally available foods.",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: Activity,
    title: "Disease Risk Prediction",
    description: "Advanced AI analysis of EHR data, genetics, and lifestyle to predict chronic disease risks years in advance with preventive recommendations.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Cross,
    title: "Digital First Aid",
    description: "Immediate digital first-aid guidance when medical help isn't available. Connect with local ASHA workers when doctors are unavailable.",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: BarChart3,
    title: "Health Dashboard",
    description: "Unified view of today's medicines, health summaries, diet plans, risk scores, and emergency contacts. Your health at a glance.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent reminders for medicines, appointments, tests, meals, and daily preventive health tips. Stay on top of your health.",
    color: "text-green-600",
    bgColor: "bg-green-50"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-soft/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Comprehensive Features</span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Complete Healthcare
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nine powerful features working together to provide comprehensive healthcare assistance, 
            from medication management to emergency response and preventive care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-6 border-border hover:border-primary/20 transition-medical hover:shadow-medical bg-white/50 backdrop-blur-sm hover:scale-105"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-medical">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-medical">
                <div className="w-full h-1 bg-gradient-primary rounded-full"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to experience the future of healthcare?
          </p>
          <div className="inline-flex items-center space-x-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">All features available on web platform</span>
            <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;