"use client";

import React, { useState, useRef } from "react";
import Header from "@/components/Header";

export default function WITDAYAmbassador() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Here you would typically upload the image and process the form
      // For now, we'll just show a success message
      setMessage("Thank you for your submission! Your WITDAY Ambassador image will be processed.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        profileImage: null,
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg italic mb-2">Form Create Your Own Women in Tech Day Ambassador Image!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Empower. Innovate. Elevate. – Amplify the reach of Women in Tech Day #WITDAY
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Women in Tech Day (WITDAY) is all about recognizing and celebrating the contributions of women in technology, driving change, and inspiring the next generation. 
                By creating and sharing your personalized Ambassador WITDAY image, you help spread awareness, amplify diverse voices, and showcase the power of representation in tech.
              </p>

              {message && (
                <div className={`mb-6 p-4 rounded-md ${
                  message.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Picture Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Picture (min 400x400px) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="profile-image"
                      required
                    />
                    <label
                      htmlFor="profile-image"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Choose File
                    </label>
                    <span className="ml-3 text-gray-500">
                      {formData.profileImage ? formData.profileImage.name : "No file chosen"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Get started by uploading a high-quality profile picture (minimum 400x400px, max 80MB, formats: gif, jpg, png, jpeg).
                  </p>
                </div>

                {/* Name, Title, Company */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name, Title, Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name, Title, Company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Input your email to generate a custom visual to announce your participation and highlight your role in shaping the future of technology.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

            {/* Right Side - Visual Preview */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Visual Preview</h2>
              
              <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 rounded-lg overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
                    {/* Network nodes and connections */}
                    <circle cx="50" cy="100" r="3" fill="white" />
                    <circle cx="150" cy="80" r="2" fill="white" />
                    <circle cx="250" cy="120" r="3" fill="white" />
                    <circle cx="350" cy="90" r="2" fill="white" />
                    <circle cx="80" cy="200" r="2" fill="white" />
                    <circle cx="180" cy="180" r="3" fill="white" />
                    <circle cx="280" cy="220" r="2" fill="white" />
                    <circle cx="320" cy="160" r="3" fill="white" />
                    
                    {/* Connection lines */}
                    <line x1="50" y1="100" x2="150" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="150" y1="80" x2="250" y2="120" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="250" y1="120" x2="350" y2="90" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="80" y1="200" x2="180" y2="180" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="180" y1="180" x2="280" y2="220" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="280" y1="220" x2="320" y2="160" stroke="white" strokeWidth="1" opacity="0.3" />
                  </svg>
                </div>

                <div className="relative p-8 text-white text-center">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-teal-300 mb-2">#WITDAY</h3>
                    <p className="text-lg">WOMEN IN TECH DAY</p>
                    <div className="text-right mt-4">
                      <p className="text-lg font-semibold">womentech</p>
                      <p className="text-sm tracking-wider">n e t w o r k</p>
                    </div>
                  </div>

                  {/* Profile Image Placeholder */}
                  <div className="mx-auto w-32 h-32 bg-purple-300 rounded-full mb-6 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>

                  {/* Name Placeholder */}
                  <div className="bg-purple-600 bg-opacity-80 rounded-full px-6 py-2 mb-8 inline-block">
                    <p className="text-xl font-semibold">Name</p>
                  </div>

                  {/* Bottom Text */}
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">As a WomenTech Network Global Ambassador,</p>
                    <p className="text-lg font-bold">I'm on a mission to amplify 15 million women</p>
                    <p className="text-lg font-bold">in tech this #WITDAY!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 