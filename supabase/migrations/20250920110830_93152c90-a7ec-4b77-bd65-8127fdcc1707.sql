-- Check which tables still need RLS that have existing policies
SELECT schemaname, tablename, enable_row_security 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('credits', 'job_files', 'jobs');