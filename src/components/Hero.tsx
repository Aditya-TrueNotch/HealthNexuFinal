import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Zap, Users, Heart } from "lucide-react";
import heroImage from "@/assets/hero-medical-ai.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-soft overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-32 bg-accent-teal/10 rounded-3xl blur-2xl animate-float" style={{ animationDelay: "-3s" }}></div>

      <div className="container mx-auto px-8 pt-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-soft/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Healthcare Assistant</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Your Complete
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  Healthcare Companion
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Health Nexus combines medication management, AI report analysis, emergency response, and personalized health insights in one unified platform. Empowering patients, supporting doctors, enhancing care.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">9+</div>
                <div className="text-sm text-muted-foreground">Core Features</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-teal">24/7</div>
                <div className="text-sm text-muted-foreground">AI Assistance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">100%</div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button variant="hero" size="lg" className="group">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="soft" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-accent-teal" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-success" />
                <span>Multi-language</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
              <img
                src={heroImage}
                alt="Health Nexus Healthcare Dashboard Interface"
                className="rounded-2xl shadow-glow w-full h-auto"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-2xl shadow-medical animate-pulse-soft flex items-center justify-center text-white">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-teal rounded-xl shadow-medical animate-pulse-soft flex items-center justify-center text-white" style={{ animationDelay: "-1s" }}>
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;