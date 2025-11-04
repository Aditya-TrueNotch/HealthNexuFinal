import { Card } from "@/components/ui/card";
import { 
  Users, 
  Clock, 
  Shield, 
  TrendingUp, 
  Globe, 
  Zap 
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "For Patients",
    description: "Never miss medications, understand your health reports, get instant emergency help, and receive personalized health guidance.",
    features: ["Medication reminders", "Report summaries", "Emergency response", "Health insights"]
  },
  {
    icon: Shield,
    title: "For Doctors",
    description: "Access structured patient data, automated report processing, and comprehensive health analytics to make better decisions.",
    features: ["Structured data", "Time saving", "Better insights", "Patient monitoring"]
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock AI assistance for health queries, emergency situations, and medication management.",
    features: ["Always available", "Instant response", "Emergency ready", "Multi-language"]
  },
  {
    icon: TrendingUp,
    title: "Preventive Care",
    description: "Predict chronic disease risks years in advance and receive personalized recommendations for prevention.",
    features: ["Risk prediction", "Early detection", "Preventive plans", "Health monitoring"]
  },
  {
    icon: Globe,
    title: "Universal Access",
    description: "Available on web platform with multi-language support and integration with local healthcare systems.",
    features: ["Web-based", "Multi-language", "Local integration", "Accessible design"]
  },
  {
    icon: Zap,
    title: "Instant Impact",
    description: "Immediate setup with instant benefits. Start receiving medication reminders and health insights from day one.",
    features: ["Quick setup", "Immediate benefits", "Easy to use", "Proven results"]
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-soft/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Key Benefits</span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Why Choose
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Health Nexus?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the comprehensive benefits of AI-powered healthcare assistance 
            designed for patients, doctors, and healthcare systems.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group p-8 border-border hover:border-primary/20 transition-medical hover:shadow-medical bg-white/50 backdrop-blur-sm hover:scale-105"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-bounce shadow-medical text-white">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-medical">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-hero rounded-3xl p-12 text-white shadow-glow">{/* Text color is white for contrast */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Trusted by Healthcare Professionals
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Health Nexus is designed with input from healthcare professionals and 
              built to meet the highest standards of medical data security and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-white/80 text-sm">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">HIPAA</div>
              <div className="text-white/80 text-sm">Compliant Security</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-white/80 text-sm">Languages Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80 text-sm">AI Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;