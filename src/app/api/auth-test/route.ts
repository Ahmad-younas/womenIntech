import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This is a simple test API route to verify Supabase authentication
// DO NOT USE IN PRODUCTION - FOR DEBUGGING ONLY
export async function GET() {
  try {
    // Check Supabase connection
    const configInfo = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured' : 'Missing',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Configured' : 'Missing',
      nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set'
    };
    
    // Test Supabase connection
    const {  error: testError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1);
    
    // Test auth state
    const { data: { session } } = await supabase.auth.getSession();
    
    return NextResponse.json({
      status: 'success',
      message: 'Auth test route',
      config: configInfo,
      databaseTest: testError ? { error: testError.message } : { success: true },
      authSession: session ? 'Active' : 'None',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'An error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 