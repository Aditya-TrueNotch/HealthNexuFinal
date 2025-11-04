import { Button } from "@/components/ui/button";
import { Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-medical text-white">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Health Nexus</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-medical">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-medical">
              How It Works
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-primary transition-medical">
              Benefits
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-medical">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="soft" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;