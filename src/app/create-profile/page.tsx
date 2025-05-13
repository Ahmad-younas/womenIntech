"use client"
import React, { useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import PhoneInput from "react-phone-input-2";
import countries from "world-countries";
import "react-phone-input-2/lib/style.css";
import UserProtectedRoute from "@/components/UserProtectedRoutes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type SessionData = {
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
};

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profileImage?: File;
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

export default function ProfileForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session } = useSession() as SessionData;
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        phone: "",
        country: "",
        organization: "",
        title: ""
    });

    const userid = session?.user?.id;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };



    const removeImage = () => {
        setProfileImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handlePhoneChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            phone: value
        }));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);


        setLoading(true);

        try {
            // Register the user
            const registrationData: UserRegistrationData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                bio: formData.bio,
                organization: formData.organization,
                title: formData.title,
                phone: formData.phone,
                country: formData.country,
                profileImage: profileImage || undefined
            };



            console.log("registrationData", registrationData);

            let profileImageUrl: string | undefined = undefined;
            // Upload profile image if one exists
            if (profileImage) {
                // Upload the image to the correct bucket
                const fileExt = profileImage.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from("profile-images")
                    .upload(filePath, profileImage);

                if (uploadError) throw new Error("Image upload failed");

                // Get the public URL from the same bucket
                const { data: publicUrlData } = supabase.storage
                    .from("profile-images")
                    .getPublicUrl(filePath);

                profileImageUrl = publicUrlData.publicUrl;
            }

            console.log("userID", userid);
            const { error: insertError } = await supabase.from("user_profile").insert([
                {
                    id: userid,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    bio: formData.bio,
                    email: formData.email,
                    organization: formData.organization,
                    title: formData.title,
                    phone_number: formData.phone,
                    country: formData.country,
                    profile_image: profileImageUrl,
                    status: "pending", // for admin approval flow
                },
            ]);
            console.log("error", error);
            console.log("insertError", insertError);

            if (insertError) throw new Error(insertError.message);

            const response = await fetch("/api/send-notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: formData.email,
                    userName: `${formData.firstName} ${formData.lastName}`,
                }),
            });

            console.log("response", response);

            //router.push("/registration-success");
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "An error occurred during registration. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target instanceof HTMLInputElement && e.target.type === "checkbox")
            ? e.target.checked
            : undefined;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    }

    return (
        <UserProtectedRoute>
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
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative mb-4">
                                {profileImage ? (
                                    <div className="relative">
                                        {previewUrl ? (
                                            <Image
                                                src={previewUrl}
                                                alt="Profile preview"
                                                width={100}
                                                height={100}
                                                className="rounded-full object-cover w-[100px] h-[100px]"
                                            />
                                        ) : null}

                                        <button
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
                                        onClick={triggerFileInput}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="text-sm font-medium text-[#4eb1ba] hover:text-[#4e2a5a]"
                            >
                                {profileImage ? "Change profile picture" : "Upload profile picture"}
                            </button>
                        </div>

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
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <PhoneInput country="us" value={formData.phone} areaCodes={["1"]} autoFormat={true} onChange={handlePhoneChange} containerStyle={{ border: "1px solid #e0e0e0", borderRadius: "4px", padding: "8px" }} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <select name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]">
                                    <option value="">Select your country</option>
                                    {(countries as Country[]).map(c => (
                                        <option key={c.cca2} value={c.name.common}>{c.name.common}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                <input name="organization" value={formData.organization} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]" placeholder="e.g. Google" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4eb1ba] focus:border-[#4eb1ba]" placeholder="e.g. Software Engineer" />
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e2a5a] hover:bg-[#3d2147] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4eb1ba] disabled:opacity-70"
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </main>
        </UserProtectedRoute>
    );

};
