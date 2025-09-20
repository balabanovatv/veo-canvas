-- Enable Row Level Security on chat_logs table
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view only their own chat logs
CREATE POLICY "Users can view their own chat logs" 
ON public.chat_logs 
FOR SELECT 
USING (auth.uid()::text = user_id);

-- Create policy for users to insert their own chat logs
CREATE POLICY "Users can insert their own chat logs" 
ON public.chat_logs 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

-- Create policy for users to update their own chat logs
CREATE POLICY "Users can update their own chat logs" 
ON public.chat_logs 
FOR UPDATE 
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);

-- Create policy for users to delete their own chat logs
CREATE POLICY "Users can delete their own chat logs" 
ON public.chat_logs 
FOR DELETE 
USING (auth.uid()::text = user_id);