-- Supabase Row Level Security Fix
-- Run this SQL in your Supabase SQL Editor to fix RLS policy issues

-- First, disable RLS temporarily to check the table structure
ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can read their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Service role can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Allow insert for anon" ON public.user_roles;

-- Create proper RLS policies
-- 1. Policy to allow authenticated users to read only their own role
CREATE POLICY "Users can read their own role" 
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- 2. Policy to allow insertion of roles (important for registration)
CREATE POLICY "Allow insert for authenticated and anon" 
  ON public.user_roles
  FOR INSERT
  WITH CHECK (true);  -- Allow any insert operation

-- 3. Policy for service role to manage all rows
CREATE POLICY "Service role can manage all rows" 
  ON public.user_roles
  USING (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

-- 4. Enable RLS again
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Grant proper permissions
GRANT SELECT ON public.user_roles TO authenticated;
GRANT INSERT ON public.user_roles TO authenticated;
GRANT INSERT ON public.user_roles TO anon;
GRANT USAGE ON SEQUENCE public.user_roles_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE public.user_roles_id_seq TO anon;

-- Check if we need to update serial sequence ownership
ALTER SEQUENCE IF EXISTS public.user_roles_id_seq OWNED BY public.user_roles.id;

-- Output success message
SELECT 'Row Level Security policies have been updated successfully.' as result; 