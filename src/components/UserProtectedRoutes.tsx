"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

type SessionData = {
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
};

interface UserProtectedRouteProps {
    children: ReactNode;
}

export default function UserProtectedRoute({ children }: UserProtectedRouteProps) {
    const router = useRouter();
    const { data: session, status } = useSession() as SessionData;
    const loading = status === "loading";
    const isAuthenticated = status === "authenticated";
    const role = session?.user?.role;

    console.log("role from user", role);

    useEffect(() => {
        // Redirect non-admin users to the homepage when they try to access admin routes
        if (!loading && (!isAuthenticated || role !== "user")) {
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
    if (!isAuthenticated || role !== "user") {
        return null; // Will redirect in the useEffect
    }

    // Add a role indicator and sign out button for admins
    return (
        <div>
            {children}
        </div>
    );
} 