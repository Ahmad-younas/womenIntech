"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

export default function AuthErrorClient() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");
    const error = searchParams.get("error");

    useEffect(() => {
        if (errorCode === "otp_expired" || error === "access_denied") {
            setMessage("Your verification link has expired. Please enter your email to receive a new link.");
        }
    }, [errorCode, error]);

    const resendVerificationEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setMessage("Please enter your email address");
            return;
        }

        setStatus("loading");
        try {
            const redirectTo =
                typeof window !== "undefined"
                    ? `${window.location.origin}/auth/callback`
                    : process.env.NEXT_PUBLIC_SITE_URL
                        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
                        : "http://localhost:3000/auth/callback";

            const { error } = await supabase.auth.resend({
                type: "signup",
                email,
                options: {
                    emailRedirectTo: redirectTo,
                },
            });

            if (error) {
                console.error("Error resending verification:", error);
                setStatus("error");
                setMessage(error.message || "Failed to send verification email");
            } else {
                setStatus("success");
                setMessage("A new verification link has been sent to your email. Please check your inbox.");
            }
        } catch (err) {
            console.error("Exception resending verification:", err);
            setStatus("error");
            setMessage("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <main className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-col items-center justify-center bg-gray-50 py-16 px-4 flex-grow">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200 text-center">
                    <div className="mb-6 flex justify-center">
                        {status === "success" ? (
                            <div className="rounded-full bg-green-100 p-4">
                                <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ) : (
                            <div className="rounded-full bg-yellow-100 p-4">
                                <svg className="h-12 w-12 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-[#4e2a5a] mb-4">
                        {status === "success" ? "Verification Email Sent" : "Authentication Error"}
                    </h1>

                    <p className="text-gray-600 mb-6">
                        {errorDescription || message || "An authentication error occurred"}
                    </p>

                    {status !== "success" && errorCode === "otp_expired" && (
                        <form onSubmit={resendVerificationEmail} className="space-y-4 mb-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e2a5a] hover:bg-[#3d2147] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4eb1ba] disabled:opacity-70"
                            >
                                {status === "loading" ? "Sending..." : "Resend Verification Email"}
                            </button>
                        </form>
                    )}

                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/login"
                            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4eb1ba] hover:bg-[#3a868d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4e2a5a] flex justify-center"
                        >
                            Return to Login
                        </Link>

                        <Link
                            href="/"
                            className="text-[#4eb1ba] hover:text-[#4e2a5a] font-medium"
                        >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
