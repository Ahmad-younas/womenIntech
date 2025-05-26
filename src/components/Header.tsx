"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";

type SessionData = {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

export default function Header({ activePage = "" }: { activePage?: string }) {
  const { data: session } = useSession() as SessionData;
  const isAdmin = session?.user?.role === "admin";
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: "/" // Redirect to home page after logout
      });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Featured banner */}
      <div className="bg-[#4e2a5a] text-white py-2 text-center">
        Featured: Women Driving Digital Transformation: Challenges, Opportunities and Trends
      </div>
      
      {/* Navigation bar */}
      <div className="flex justify-end bg-[#4eb1ba] text-white py-2 px-6">
        {isAdmin && (
          <Link 
            href="/admin" 
            className={`mr-4 ${activePage === "admin" ? "font-bold underline" : ""}`}
          >
            Admin Dashboard
          </Link>
        )}
        {session ? (
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`${activePage === "profile" ? "font-bold underline" : ""} ${isLoggingOut ? "opacity-50 cursor-not-allowed" : "hover:underline"} flex items-center`}
          >
            {isLoggingOut ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging out...
              </>
            ) : (
              "Log out"
            )}
          </button>
        ) : (
          <Link 
            href="/login"
            className={activePage === "login" ? "font-bold underline" : ""}
          >
            Log in
          </Link>
        )}
      </div>
      
      {/* Logo and main navigation */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-[#4e2a5a] text-2xl font-bold">women</span>
            <span className="text-[#4eb1ba] text-2xl font-bold">tech</span>
            <span className="text-gray-500 text-2xl font-light ml-2">network</span>
          </div>
        </Link>
        
        {activePage === "home" && (
          <div className="flex space-x-6">
            <Link href="/conference" className="text-gray-700 hover:text-[#4eb1ba]">
              Women in Tech Global Conference 2025
            </Link>
            <Link href="/awards" className="text-gray-700 hover:text-[#4eb1ba]">
              Global Awards
            </Link>
            
            <Link href="/100women" className="text-gray-700 hover:text-[#4eb1ba]">
              100 Women in Tech
            </Link>
            <Link 
          href="/create-profile" 
           className="text-gray-700 hover:text-[#4eb1ba]"
        >
          Membership
        </Link>
            <Link href="/events" className="text-gray-700 hover:text-[#4eb1ba]">
              Events
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#4eb1ba]">
              About
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-[#4eb1ba]">
              Resources
            </Link>
          </div>
        )}
      </nav>
    </>
  );
} 