-- Fix remaining RLS disabled tables
ALTER TABLE public.chat_logs_alphaschool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs_bondervill ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_memory ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for chat_logs_alphaschool  
CREATE POLICY "Users can view their own alphaschool chat logs" 
ON public.chat_logs_alphaschool 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own alphaschool chat logs" 
ON public.chat_logs_alphaschool 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

-- Add RLS policies for chat_logs_bondervill
CREATE POLICY "Users can view their own bondervill chat logs" 
ON public.chat_logs_bondervill 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own bondervill chat logs" 
ON public.chat_logs_bondervill 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

-- Add RLS policies for conversation_memory
CREATE POLICY "Users can view their own conversation memory" 
ON public.conversation_memory 
FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own conversation memory" 
ON public.conversation_memory 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own conversation memory" 
ON public.conversation_memory 
FOR UPDATE 
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);