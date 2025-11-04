import { Heart, Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-hero rounded-lg shadow-medical text-white">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Health Nexus</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Your complete healthcare companion, powered by AI. 
              Empowering patients, supporting doctors, enhancing care.
            </p>
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <Shield className="h-4 w-4" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Core Features</h4>
            <ul className="space-y-2 text-white/70">
              <li>Medication Reminder</li>
              <li>Medical Report Summarizer</li>
              <li>Emergency Assistant</li>
              <li>Nutrition Planner</li>
              <li>Risk Prediction</li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-semibold mb-4">For Users</h4>
            <ul className="space-y-2 text-white/70">
              <li>Download App</li>
              <li>Web Access</li>
              <li>User Guide</li>
              <li>Support Center</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-white/70">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@healthnexus.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 1800-HealthNexus</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Available Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/60 text-sm">
            © 2024 Health Nexus. All rights reserved. Built with ❤️ for better healthcare.
          </div>
          <div className="flex space-x-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-medical">Terms</a>
            <a href="#" className="hover:text-white transition-medical">Privacy</a>
            <a href="#" className="hover:text-white transition-medical">Security</a>
            <a href="#" className="hover:text-white transition-medical">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;