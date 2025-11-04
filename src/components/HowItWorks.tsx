import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Scan, 
  Brain, 
  CheckCircle, 
  ArrowRight 
} from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Access Platform",
    description: "Access Health Nexus via web browser. Quick setup with secure profile creation.",
    step: "01"
  },
  {
    icon: Scan,
    title: "Scan & Upload",
    description: "Scan prescriptions, upload medical reports, or input symptoms using voice or text in multiple languages.",
    step: "02"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI processes your data, analyzes patterns, and generates personalized insights and recommendations.",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Get Results",
    description: "Receive medication reminders, health summaries, emergency alerts, and personalized care plans instantly.",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-soft/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-4">
            How Health Nexus
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Works for You
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Getting started with comprehensive healthcare assistance is simple. 
            Follow these four easy steps to transform your healthcare experience.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-primary opacity-20"></div>
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 text-center border-border hover:border-primary/20 transition-medical hover:shadow-medical bg-white/70 backdrop-blur-sm group hover:scale-105">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-bold shadow-medical">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary-soft rounded-2xl flex items-center justify-center group-hover:scale-110 transition-bounce">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-medical">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow (except last item) */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto shadow-medical">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who are already experiencing the future of healthcare with Health Nexus.
            </p>
            <Button variant="hero" size="lg" className="group">
              Start Your Health Journey
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;