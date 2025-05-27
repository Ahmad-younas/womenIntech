"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";

export default function WITDAYAmbassador() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup function to revoke object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      // Revoke previous URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      
      // Create preview URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Submit button clicked!');
    e.preventDefault();
    console.log('Form submission prevented default');
    setLoading(true);
    console.log('Loading state set to true');
    setMessage("");
    console.log('Message cleared');

    try {
      console.log('Starting form validation...');
      // Validate required fields
      if (!formData.name.trim()) {
        console.log('Name validation failed');
        setMessage("Please enter your name, title, and company.");
        setLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        console.log('Email validation failed');
        setMessage("Please enter your email address.");
        setLoading(false);
        return;
      }

      if (!formData.profileImage) {
        console.log('Profile image validation failed');
        setMessage("Please upload a profile image.");
        setLoading(false);
        return;
      }

      console.log('All validations passed, starting canvas creation...');

      // Create the complete WITDAY ambassador image manually using canvas
      const canvas = document.createElement('canvas');
      canvas.width = 384;
      canvas.height = 600;
      const ctx = canvas.getContext('2d')!;

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // Create purple gradient background
      const gradient = ctx.createLinearGradient(0, 0, 384, 600);
      gradient.addColorStop(0, '#7c3aed');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#9333ea');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 384, 600);
      console.log('Background gradient applied');

      // Add background pattern dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      const dots = [
        {x: 50, y: 100, r: 3},
        {x: 150, y: 80, r: 2},
        {x: 250, y: 120, r: 3},
        {x: 350, y: 90, r: 2},
        {x: 80, y: 200, r: 2},
        {x: 180, y: 180, r: 3},
        {x: 280, y: 220, r: 2},
        {x: 320, y: 160, r: 3}
      ];
      
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fill();
      });
      console.log('Background dots added');

      // Add #WITDAY text
      ctx.fillStyle = '#06d6a0'; // Teal color
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('#WITDAY', 192, 80);
      console.log('#WITDAY text added');
      
      // Add "WOMEN IN TECH DAY" text
      ctx.fillStyle = 'white';
      ctx.font = '18px Arial';
      ctx.fillText('WOMEN IN TECH DAY', 192, 110);
      console.log('WOMEN IN TECH DAY text added');
      
      // Add "womentech network" text (top right)
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'right';
      ctx.fillText('womentech', 350, 140);
      ctx.font = '12px Arial';
      ctx.fillText('n e t w o r k', 350, 160);
      console.log('womentech network text added');

      // Add profile image if uploaded
      if (formData.profileImage) {
        try {
          console.log('Processing profile image...');
          
          // Check if createImageBitmap is supported
          if (typeof createImageBitmap === 'undefined') {
            console.log('createImageBitmap not supported, using fallback');
            // Fallback: just draw a placeholder
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(192, 250, 64, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            console.log('createImageBitmap supported, processing image...');
            // Use createImageBitmap with the original file for better reliability
            const imageBitmap = await createImageBitmap(formData.profileImage);
            console.log('Image bitmap created:', imageBitmap.width, 'x', imageBitmap.height);
            
            // Draw circular profile image
            const centerX = 192;
            const centerY = 250;
            const radius = 64;
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.clip();
            
            // Calculate scaling to fit image in circle
            const scale = Math.max(radius * 2 / imageBitmap.width, radius * 2 / imageBitmap.height);
            const scaledWidth = imageBitmap.width * scale;
            const scaledHeight = imageBitmap.height * scale;
            const offsetX = centerX - scaledWidth / 2;
            const offsetY = centerY - scaledHeight / 2;
            
            ctx.drawImage(imageBitmap, offsetX, offsetY, scaledWidth, scaledHeight);
            ctx.restore();
            
            // Add circular border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            
            // Clean up the bitmap
            imageBitmap.close();
            console.log('Profile image processed successfully');
          }
        } catch (error) {
          console.log('Error loading profile image:', error);
          // Draw placeholder circle
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(192, 250, 64, 0, 2 * Math.PI);
          ctx.fill();
        }
      } else {
        console.log('No profile image uploaded, drawing placeholder');
        // Draw placeholder circle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(192, 250, 64, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Add name banner
      if (formData.name) {
        ctx.fillStyle = 'rgba(124, 58, 237, 0.8)';
        ctx.fillRect(42, 340, 300, 40);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formData.name, 192, 365);
      }

      // Add bottom text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('As a WomenTech Network Global Ambassador,', 192, 420);
      ctx.font = 'bold 18px Arial';
      ctx.fillText("I'm on a mission to amplify 15 million women", 192, 450);
      ctx.fillText('in tech this #WITDAY!', 192, 480);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            console.log('Canvas blob created successfully:', {
              size: blob.size,
              type: blob.type,
              canvasWidth: canvas.width,
              canvasHeight: canvas.height
            });
            resolve(blob);
          }
        }, 'image/png', 1.0);
      });

      console.log('Final blob size:', blob.size, 'bytes');

      // Create FormData to send to API
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("email", formData.email);
      submitFormData.append("profileImage", blob, `${formData.name.split(',')[0]}_WITDAY_Ambassador.png`);

      // Send to API route
      const response = await fetch("/api/witday-ambassador", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Success! Your WITDAY Ambassador image has been sent to your email. Please check your inbox!");
        
        // Clean up preview URL
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        
        // Reset form and preview
        setFormData({
          name: "",
          email: "",
          profileImage: null,
        });
        setPreviewUrl(null);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setMessage(`Error: ${result.error || "Failed to process your submission. Please try again."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("An error occurred while processing your submission. Please try again.");
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
              
              <div 
                id="witday-preview" 
                className="relative rounded-lg overflow-hidden w-96 h-[600px]"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #9333ea 100%)',
                  minHeight: '600px',
                  minWidth: '490px'
                }}
              >
                {/* Background Pattern - Using CSS instead of SVG for better html2canvas compatibility */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `
                    radial-gradient(circle at 50px 100px, white 2px, transparent 2px),
                    radial-gradient(circle at 150px 80px, white 1px, transparent 1px),
                    radial-gradient(circle at 250px 120px, white 2px, transparent 2px),
                    radial-gradient(circle at 350px 90px, white 1px, transparent 1px),
                    radial-gradient(circle at 80px 200px, white 1px, transparent 1px),
                    radial-gradient(circle at 180px 180px, white 2px, transparent 2px),
                    radial-gradient(circle at 280px 220px, white 1px, transparent 1px),
                    radial-gradient(circle at 320px 160px, white 2px, transparent 2px)
                  `,
                  backgroundSize: '400px 600px',
                  backgroundRepeat: 'no-repeat'
                }}></div>

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
                  <div className="mx-auto w-32 h-32 bg-purple-300 rounded-full mb-6 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Profile preview"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    )}
                  </div>

                  {/* Name Placeholder */}
                  <div className="bg-purple-600 bg-opacity-80 rounded-full px-6 py-2 mb-8 inline-block">
                    <p className="text-xl font-semibold">
                      {formData.name || "Name"}
                    </p>
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