-- Supabase Function to Safely Set User Roles
-- Run this SQL in your Supabase SQL Editor to create secure functions

-- Function to safely set a user's role (bypasses RLS)
CREATE OR REPLACE FUNCTION public.set_user_role(user_uuid UUID, role_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  success BOOLEAN;
BEGIN
  -- Check if the user already has a role
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = user_uuid) THEN
    -- Update existing role
    UPDATE public.user_roles 
    SET role = role_name 
    WHERE user_id = user_uuid;
  ELSE
    -- Insert new role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (user_uuid, role_name);
  END IF;
  
  success := FOUND;
  RETURN success;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get a user's role safely
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role 
  FROM public.user_roles 
  WHERE user_id = user_uuid;
  
  RETURN COALESCE(user_role, 'user');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure everyone can use these functions
GRANT EXECUTE ON FUNCTION public.set_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_user_role TO anon;
GRANT EXECUTE ON FUNCTION public.get_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role TO anon;

COMMENT ON FUNCTION public.set_user_role IS 'Sets a user role with security definer context';
COMMENT ON FUNCTION public.get_user_role IS 'Gets a user role with security definer context'; 