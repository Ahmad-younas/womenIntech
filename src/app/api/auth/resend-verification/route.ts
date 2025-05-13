import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Get the site URL for redirection
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const redirectTo = `${siteUrl}/auth/callback`;

    // Send email verification using Supabase with redirect URL
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: redirectTo
      }
    });

    if (error) {
      console.error('Error resending verification email:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: error.message || 'Failed to resend verification email' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent successfully' 
    });
    
  } catch (error: any) {
    console.error('Exception in resend verification:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
} 