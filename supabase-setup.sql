-- Supabase Setup SQL Script
-- Run this in the Supabase SQL Editor to set up your tables correctly

-- Create user_roles table with correct UUID type
CREATE TABLE IF NOT EXISTS public.user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create function to create/update the user_roles table
-- This can be called from the application
CREATE OR REPLACE FUNCTION public.create_user_roles_table()
RETURNS JSON AS $$
BEGIN
  -- Check if the table exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_roles') THEN
    -- Table exists, check if user_id is UUID or BIGINT
    IF EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'user_roles' 
      AND column_name = 'user_id' 
      AND data_type = 'bigint'
    ) THEN
      -- Drop the table and recreate with UUID
      DROP TABLE public.user_roles;
      
      -- Create the table with UUID
      CREATE TABLE public.user_roles (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id)
      );
      
      RETURN json_build_object('status', 'Table recreated with UUID type');
    ELSE
      RETURN json_build_object('status', 'Table already exists with correct type');
    END IF;
  ELSE
    -- Create the table with UUID
    CREATE TABLE public.user_roles (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(user_id)
    );
    
    RETURN json_build_object('status', 'Table created');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policies for user_roles table to secure access
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own role
CREATE POLICY "Users can read their own role" 
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for service role to manage all roles
CREATE POLICY "Service role can manage all roles" 
  ON public.user_roles
  USING (auth.role() = 'service_role');

-- Grant access to authenticated users
GRANT SELECT ON public.user_roles TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_roles_table TO anon, authenticated, service_role;

-- Grant public access to the create_user_roles_table function
GRANT EXECUTE ON FUNCTION public.create_user_roles_table TO PUBLIC; 