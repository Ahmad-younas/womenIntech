/* eslint-disable */

import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Auth.js configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          // Authenticate user with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            console.error("Supabase auth error:", error);
            
            // Handle specific Supabase auth errors
            if (error.message.includes("Email not confirmed") || 
                error.code === 'email_not_confirmed') {
              // Instead of returning null, throw a specific error that next-auth will pass to the client
              throw new Error("email_not_confirmed");
            }
            
            return null;
          }

          if (!data.user) {
            console.error("No user returned from Supabase");
            return null;
          }

          console.log("Supabase authentication successful for user:", data.user.id);

          // Get user role from Supabase - with error handling
          let role = 'user'; // Default role
          try {
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', data.user.id)
              .single();

            if (roleError) {
              if (roleError.code === '22P02' && roleError.message.includes('bigint')) {
                console.error("Database type mismatch for user_id, attempting to fix schema");
                // Try to dynamically import the createUserRole function
                try {
                  const { createUserRole } = await import('@/lib/auth');
                  await createUserRole(data.user.id, 'user');
                  
                  // Try again with the updated schema
                  const { data: retryData, error: retryError } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', data.user.id)
                    .single();
                    
                  if (!retryError && retryData) {
                    role = retryData.role;
                  }
                } catch (importError) {
                  console.error("Failed to import createUserRole:", importError);
                }
              } else {
                console.error("Error fetching user role:", roleError);
              }
            } else if (roleData) {
              role = roleData.role;
            }
          } catch (roleError) {
            console.error("Exception in role lookup:", roleError);
          }

          // Return user data with role
          return {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.user_metadata?.full_name || data.user.email,
            role: role,
            image: data.user.user_metadata?.avatar_url || null
          } as User;
        } catch (error) {
          console.error("Exception in authorize function:", error);
          return null;
        }
      }
    }),
    // You can add more providers here (Google, GitHub, etc.)
  ],
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      // Add role to JWT token if user exists
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add user role to session
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Auth.js handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 