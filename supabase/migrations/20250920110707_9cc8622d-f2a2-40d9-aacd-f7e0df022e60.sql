-- Enable RLS on remaining tables with sensitive data
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents_bondervill ENABLE ROW LEVEL SECURITY; 
ALTER TABLE public.n8n_chat_histories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_bondervill ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders_alpha_school ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vector_documents ENABLE ROW LEVEL SECURITY;

-- Add basic policies for documents (if needed for public access)
CREATE POLICY "Public can view documents" 
ON public.documents 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view bondervill documents" 
ON public.documents_bondervill 
FOR SELECT 
USING (true);

-- N8N chat histories should be restricted to specific access
CREATE POLICY "Restrict n8n chat access" 
ON public.n8n_chat_histories 
FOR ALL 
USING (false);

-- Products should be publicly viewable
CREATE POLICY "Public can view products" 
ON public.products_bondervill 
FOR SELECT 
USING (true);

-- Reminders should be user-specific
CREATE POLICY "Users can view their own reminders" 
ON public.reminders_alpha_school 
FOR SELECT 
USING (auth.uid()::text = user_id);

-- User sessions should be user-specific  
CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions 
FOR SELECT 
USING (auth.uid()::text = chat_id::text);

-- Vector documents should be user-specific
CREATE POLICY "Users can view their own vector documents" 
ON public.vector_documents 
FOR SELECT 
USING (auth.uid()::text = user_id);