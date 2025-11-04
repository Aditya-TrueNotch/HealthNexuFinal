-- Enable delete policy for medical_report_analyses
CREATE POLICY "Users can delete their own medical report analyses"
ON public.medical_report_analyses
FOR DELETE
USING (auth.uid() = user_id);