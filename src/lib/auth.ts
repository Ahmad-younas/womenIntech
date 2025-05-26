import { supabase } from './supabase';

/**
 * Register a new user with Supabase authentication
 * @param email User's email
 * @param password User's password
 * @param userData Additional user data (name, etc.)
 */
export async function registerUser(
  email: string, 
  password: string, 
) {
  try {
    // Get the site URL for redirection
    const redirectTo = typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/callback` 
      : process.env.NEXT_PUBLIC_SITE_URL 
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` 
        : 'http://localhost:3000/auth/callback';
    
    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role:"admin"
        },
        emailRedirectTo: redirectTo
      }
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error("User registration failed");
    }

    // Add user to the user_roles table with default 'user' role using our new function
    await createUserRole(authData.user.id, 'admin');

    return { 
      success: true, 
      user: authData.user 
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error 
    };
  }
}

/**
 * Upload profile image to Supabase Storage
 * @param userId User ID
 * @param imageFile Base64 image data
 */
export async function uploadProfileImage(userId: string, imageFile: string) {
  try {
    // Extract base64 data from data URL
    const base64Data = imageFile.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Generate a unique filename
    const filename = `profile-${userId}-${Date.now()}.png`;
    
    // Upload to Supabase Storage
    const {  error } = await supabase
      .storage
      .from('profile-images')
      .upload(filename, buffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('profile-images')
      .getPublicUrl(filename);

    return {
      success: true,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error
    };
  }
}

// Update the createUserRole function to use the RPC function
export async function createUserRole(userId: string, role: string = 'user') {
  try {
    console.log(`Creating user role: ${role} for user: ${userId}`);
    
    // Try to use the server-side function first (bypasses RLS)
    const {  error } = await supabase.rpc('set_user_role', {
      user_uuid: userId,
      role_name: role
    });
    
    if (error) {
      console.error("Error setting user role via RPC:", error);
      
      // Fallback: Try direct insert with improved error handling
      try {
        // Attempt direct insert (this should work if RLS is configured correctly)
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert([
            { 
              user_id: userId, 
              role: role 
            }
          ]);

        if (insertError) {
          console.error("Error setting user role via direct insert:", insertError);
          
          // Try to create the table in case it doesn't exist
          await supabase.rpc('create_user_roles_table');
          
          // Try one more time after table is ensured to exist
          const { error: finalError } = await supabase
            .from('user_roles')
            .insert([
              { 
                user_id: userId, 
                role: role 
              }
            ]);
            
          if (finalError) {
            throw finalError;
          }
        }
      } catch (directError) {
        console.error("Final error setting user role:", directError);
        return { success: false, error: directError };
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating user role:", error);
    return { success: false, error };
  }
} 