import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Heart,
  Shield,
  ArrowRight 
} from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-soft/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get in Touch</span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Ready to Transform
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Your Healthcare?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join the future of healthcare today. Get started with Health Nexus or contact our team 
            for enterprise solutions and partnerships.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="p-8 border-border bg-white/70 backdrop-blur-sm shadow-medical">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Send us a Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input 
                    placeholder="John" 
                    className="transition-medical focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input 
                    placeholder="Doe" 
                    className="transition-medical focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="transition-medical focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Organization (Optional)
                </label>
                <Input 
                  placeholder="Hospital, Clinic, or Company" 
                  className="transition-medical focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us about your healthcare needs or how we can help..."
                  rows={5}
                  className="transition-medical focus:border-primary"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full group">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>

          {/* Contact Info & CTA */}
          <div className="space-y-8">
            {/* Quick Start CTA */}
            <Card className="p-8 bg-gradient-hero text-white shadow-glow border-0">{/* Text color is white for contrast */}
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 animate-pulse-soft" />
                <h3 className="text-2xl font-bold mb-4">
                  Start Using Health Nexus Today
                </h3>
                <p className="text-white/90 mb-6">
                  Access via web and begin your healthcare transformation immediately.
                </p>
                <div className="space-y-3">
                  <Button variant="soft" size="lg" className="w-full bg-white text-primary hover:bg-white/90">
                    Access Web Platform
                  </Button>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-8 border-border bg-white/70 backdrop-blur-sm shadow-medical">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">contact@mediai.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent-teal" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Support</div>
                    <div className="text-muted-foreground">+91 1800-MEDIAI</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">Available Nationwide</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enterprise Solutions */}
            <Card className="p-8 border-border bg-white/70 backdrop-blur-sm shadow-medical">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-teal rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Enterprise Solutions
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Looking to integrate Health Nexus into your hospital, clinic, or healthcare system? 
                    Contact us for custom enterprise solutions.
                  </p>
                  <Button variant="soft" size="sm" className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;