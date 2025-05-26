"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type SessionData = {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

export default function Header({ activePage = "" }: { activePage?: string }) {
  const { data: session } = useSession() as SessionData;
  const isAdmin = session?.user?.role === "admin";

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
        <Link 
          href="/create-profile" 
          className={`mr-4 ${activePage === "membership" ? "font-bold underline" : ""}`}
        >
          Membership
        </Link>
        {session ? (
          <Link 
            href="/api/auth/signout"
            className={activePage === "profile" ? "font-bold underline" : ""}
          >
            Log out
          </Link>
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
            <Link href="/career" className="text-gray-700 hover:text-[#4eb1ba]">
              Career & Jobs
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