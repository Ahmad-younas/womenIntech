"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function RegistrationSuccess() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col items-center justify-center bg-gray-50 py-16 px-4 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-4">Registration Successful!</h1>
          
          <p className="text-gray-600 mb-8">
            Your account has been created successfully. Check your email for a verification link to activate your account.
          </p>
          
          <div className="flex flex-col space-y-4">
            <Link 
              href="/login" 
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e2a5a] hover:bg-[#3d2147] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4eb1ba] flex justify-center"
            >
              Log in to your account
            </Link>
            
            <Link
              href="/"
              className="text-[#4eb1ba] hover:text-[#4e2a5a] font-medium"
            >
              Return to Home
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>
              If you don't receive the email within a few minutes, please check your spam folder or
              <button 
                className="text-[#4eb1ba] hover:text-[#4e2a5a] ml-1 font-medium"
                onClick={() => router.push("/register")}
              >
                try again
              </button>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-md">
          <p className="text-sm text-gray-500">
            Welcome to the Women in Tech Network! You're now part of a global community 
            of women in technology, connecting you with opportunities, resources, and events 
            designed to enhance your career and influence in the tech world.
          </p>
        </div>
      </div>
    </main>
  );
} 