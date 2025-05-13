"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import "react-phone-input-2/lib/style.css";

interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  bio: string;
  profileImage?: string;
  organization: string;
  title: string;
  phone: string;
  country: string;
}

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

export default function Register() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    bio: "",
    phone: "",
    country: "",
    organization: "",
    title: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target instanceof HTMLInputElement && e.target.type === "checkbox")
      ? e.target.checked
      : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear password-related errors when user types in password fields
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(null);
    }
  };


  const validateForm = () => {
    // Password validation
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    // Check for number and special character
    const hasNumber = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    if (!hasNumber || !hasSpecialChar) {
      setPasswordError("Password must include at least one number and one special character");
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPasswordError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Register the user
      const registrationData: UserRegistrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreeTerms: formData.agreeTerms,
        bio: formData.bio,
        organization: formData.organization,
        title: formData.title,
        phone: formData.phone,
        country: formData.country,
        profileImage: profileImage || undefined
      };

      // Upload profile image if one exists
      if (profileImage) {
        registrationData.profileImage = profileImage;
      }


      const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });


      if (existingUser.user != null) {
        // User is already registered, handle the error here
        throw new Error("User is already registered with this email");
      }

      // Register user with Supabase
      const { success, user, error: registrationError } = await registerUser(
        formData.email,
        formData.password
      );

      if (!success || !user) {
        throw registrationError || new Error("Registration failed");
      }

      if (!user) throw new Error("No user returned from signUp");

      // Registration successful
      router.push("/registration-success");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className="flex flex-col min-h-screen">
      <Header activePage="register" />

      {/* Registration Form Section */}
      <div className="flex flex-col items-center justify-center bg-gray-50 py-12 px-4 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-6 text-center">Create Account</h1>
          <p className="text-center text-gray-600 mb-6">Join the Women in Tech Network</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Profile Image Upload */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]"
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${passwordError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]`}
                placeholder="At least 8 characters"
              />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters and include a number and a special character.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${passwordError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]`}
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              )}
            </div>


            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#4eb1ba] focus:ring-[#4eb1ba] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#4eb1ba] hover:text-[#4e2a5a]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#4eb1ba] hover:text-[#4e2a5a]">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e2a5a] hover:bg-[#3d2147] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4eb1ba] disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#4eb1ba] hover:text-[#4e2a5a]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}