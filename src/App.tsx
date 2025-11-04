import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MedicationReminder from "./pages/MedicationReminder";
import MedicalReportSummarizer from "./pages/MedicalReportSummarizer";
import SymptomChecker from "./pages/SymptomChecker";
import DoctorLabIntegration from "./pages/DoctorLabIntegration";
import NutritionPlanner from "./pages/NutritionPlanner";
import ChronicDiseasePredictor from "./pages/ChronicDiseasePredictor";
import DigitalFirstAid from "./pages/DigitalFirstAid";
import HealthDashboardView from "./pages/HealthDashboardView";
import SmartNotifications from "./pages/SmartNotifications";
import AIChat from "./pages/AIChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medication-reminder" element={<MedicationReminder />} />
            <Route path="/medical-report-summarizer" element={<MedicalReportSummarizer />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/doctor-lab-integration" element={<DoctorLabIntegration />} />
            <Route path="/nutrition-planner" element={<NutritionPlanner />} />
            <Route path="/chronic-disease-predictor" element={<ChronicDiseasePredictor />} />
            <Route path="/digital-first-aid" element={<DigitalFirstAid />} />
            <Route path="/health-dashboard-view" element={<HealthDashboardView />} />
            <Route path="/smart-notifications" element={<SmartNotifications />} />
            <Route path="/ai-chat" element={<AIChat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
