"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

type SessionData = {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const router = useRouter();
  const { data: session, status } = useSession() as SessionData;
  const loading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const role = session?.user?.role;

  console.log("role from admin", role);

  useEffect(() => {
    // Redirect non-admin users to the homepage when they try to access admin routes
    if (!loading && (!isAuthenticated || role !== "admin")) {
      console.log("moving to home");
      router.push("/");
    }
  }, [loading, isAuthenticated, role, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#4e2a5a] border-t-[#4eb1ba] rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Verifying your credentials...</p>
      </div>
    );
  }

  // Show unauthorized message if not authenticated or not admin
  if (!isAuthenticated || role !== "admin") {
    return null; // Will redirect in the useEffect
  }

  // Add a role indicator and sign out button for admins
  return (
    <div>
      {children}

      {/* Admin Controls */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
        <div className="text-sm font-medium text-gray-700 mb-2">Admin Controls</div>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-[#4e2a5a] text-white rounded hover:bg-[#3d2147] text-sm"
        >
          Sign Out
        </button>
        <div className="mt-2 text-xs text-gray-500">
          Signed in as: <span className="font-medium">{session?.user?.email}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Role: <span className="font-medium text-[#4eb1ba]">{role}</span>
        </div>
      </div>
    </div>
  );
} 