import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_code = requestUrl.searchParams.get('error_code');
  
  // Handle error redirects
  if (error || error_code) {
    // Redirect to our custom error page
    return NextResponse.redirect(
      new URL(`/auth-error?error=${error || ''}&error_code=${error_code || ''}&error_description=${requestUrl.searchParams.get('error_description') || ''}`, 
      request.url)
    );
  }
  
  // Get the URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/', request.url));
} 