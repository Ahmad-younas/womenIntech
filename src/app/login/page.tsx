"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      console.log("Authentication result:", result);

      if (result?.error) {
        // Check if the error message contains the email_not_confirmed code
        if (result.error.includes("email_not_confirmed") || result.error.includes("Email not confirmed")) {
          setError(
            "Your email address has not been verified. Please check your inbox for a verification email and click the link to activate your account. If you need a new verification email, use the 'Resend verification' option below."
          );
        } else if (result.error === "CredentialsSignin") {
          setError("Invalid email or password. Please check your credentials and try again.");
        } else {
          setError(`Authentication failed: ${result.error}`);
        }
      } else if (result?.ok) {
        // Successful login
        router.push("/");
        router.refresh();
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Login exception:", error);
      setError("An unexpected error occurred during sign in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  // Add a function to resend verification email
  const resendVerification = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("Verification email sent! Please check your inbox.");
      } else {
        setError(data.message || "Failed to resend verification email");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setError("Failed to resend verification email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header activePage="login" />

      {/* Login Form Section */}
      <div className="flex flex-col items-center justify-center bg-gray-50 py-16 px-4 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-6 text-center">Log In</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {error && error.includes("Your email address has not been verified") && (
            <div className="mt-2 mb-4">
              <button
                type="button"
                onClick={resendVerification}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4eb1ba] hover:bg-[#3a868d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4e2a5a] disabled:opacity-70"
              >
                {loading ? "Sending..." : "Resend Verification Email"}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-[#4eb1ba] hover:text-[#4e2a5a]">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#4eb1ba] focus:ring-[#4eb1ba] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e2a5a] hover:bg-[#3d2147] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4eb1ba] disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthSignIn("google")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn("linkedin")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1.005-.019-2.299-1.381-2.299-1.382 0-1.601 1.094-1.601 2.226v4.25H8.339V7.875h2.566v1.188h.036c.358-.674 1.228-1.387 2.527-1.387 2.703 0 3.203 1.778 3.203 4.092v4.57zM5.005 6.675a1.53 1.53 0 01-1.541-1.541 1.53 1.53 0 011.541-1.54 1.53 1.53 0 011.54 1.54 1.53 1.53 0 01-1.54 1.54zm1.328 9.663H3.667V7.875h2.666v8.463zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-[#4eb1ba] hover:text-[#4e2a5a]">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 