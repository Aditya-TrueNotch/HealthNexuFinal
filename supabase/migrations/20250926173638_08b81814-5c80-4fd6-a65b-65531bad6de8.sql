-- Create storage bucket for medical reports
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-reports', 'medical-reports', false);

-- Create RLS policies for medical reports storage
CREATE POLICY "Users can upload their own medical reports" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'medical-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own medical reports" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'medical-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own medical reports" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'medical-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create table for medication reminders
CREATE TABLE public.medication_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  reminder_times TIME[] NOT NULL,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on medication_reminders
ALTER TABLE public.medication_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for medication reminders
CREATE POLICY "Users can view their own medication reminders" 
ON public.medication_reminders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medication reminders" 
ON public.medication_reminders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medication reminders" 
ON public.medication_reminders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medication reminders" 
ON public.medication_reminders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create table for medical report analyses
CREATE TABLE public.medical_report_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_filename TEXT NOT NULL,
  report_url TEXT NOT NULL,
  analysis_summary TEXT,
  key_findings TEXT[],
  recommendations TEXT[],
  severity_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on medical_report_analyses
ALTER TABLE public.medical_report_analyses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for medical report analyses
CREATE POLICY "Users can view their own medical report analyses" 
ON public.medical_report_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medical report analyses" 
ON public.medical_report_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on medication_reminders
CREATE TRIGGER update_medication_reminders_updated_at
BEFORE UPDATE ON public.medication_reminders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();