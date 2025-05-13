import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:',
    !supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL is missing' : '',
    !supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY is missing' : ''
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true, 
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Verify the Supabase client connection on initialization
(async () => {
  try {
    // Simple health check with version info
    const { error } = await supabase.from('user_roles').select('role').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection established successfully');
    }
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
  }
})();

// Function to get user role from Supabase
export async function getUserRole(userId: string): Promise<string | null> {
  try {
    // Query the user_roles table to get the role for this user
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data?.role || 'user'; // Default to 'user' if no role found
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
} 