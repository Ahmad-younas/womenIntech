"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset password logic would go here
    console.log("Reset password for:", email);
    setSubmitted(true);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Forgot Password Form Section */}
      <div className="flex flex-col items-center justify-center bg-gray-50 py-16 px-4 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-6 text-center">Reset Password</h1>

          {!submitted ? (
            <>
              <p className="text-center text-gray-600 mb-6">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

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
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e2a5a] hover:bg-[#3d2147] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4eb1ba]"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Check your email</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>.
                  Please check your inbox and spam folder.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm font-medium text-[#4eb1ba] hover:text-[#4e2a5a]">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 