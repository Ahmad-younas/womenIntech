"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
// Mock data for demonstration
type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  email: string;
  phone_number: string;
  bio: string;
  country: string;
  organization: string;
  title: string;
  status: string;
  created_at: string
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user_profile")
        .select("*");

      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);





  // Filter users based on selected filter
  const filteredUsers = filter === "all"
    ? users
    : users.filter(user => user.status === filter);

  // Handle approving a user
  const handleApprove = async (userId: string) => {
    const user = users.find((u) => u.id === userId); // ✅ get the right user
    if (!user) return;

    // Update in Supabase
    const { error } = await supabase
      .from("user_profile")
      .update({ status: "approved" })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update failed:", error.message);
      return;
    }


    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: "approved" } : user
      )
    );
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: "approved" });
    }
    try {
      await fetch("/api/send-approval-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, first_name: user.first_name }),
      });
      console.log("Approval email sent.");
    } catch (err) {
      console.error("Failed to send email:", err);
    }

  };

  // Handle rejecting a user
  const handleReject = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: "rejected" } : user
      )
    );
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: "rejected" });
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminProtectedRoute>
      <main className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-col bg-gray-50 py-8 px-4 flex-grow">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#4e2a5a]">Admin Dashboard</h1>
              <p className="text-gray-600">Manage user profiles and permissions</p>
            </div>

            {/* Admin Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* User List Panel */}
              <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-[#4e2a5a] text-white">
                  <h2 className="text-xl font-semibold">User Profiles</h2>
                </div>

                {/* Filter Controls */}
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setFilter("all")}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "all" ? "bg-[#4eb1ba] text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter("pending")}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "pending" ? "bg-[#4eb1ba] text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setFilter("approved")}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "approved" ? "bg-[#4eb1ba] text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => setFilter("rejected")}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${filter === "rejected" ? "bg-[#4eb1ba] text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      Rejected
                    </button>
                  </div>
                </div>

                {/* User List */}
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {filteredUsers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No users found matching the current filter
                    </div>
                  ) : (
                    filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.profile_image}
                              alt={`${user.first_name} ${user.last_name}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* User Details Panel */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                {selectedUser ? (
                  <div>
                    <div className="p-4 bg-[#4e2a5a] text-white flex justify-between items-center">
                      <h2 className="text-xl font-semibold">User Profile</h2>
                      <div className="flex space-x-2">
                        {selectedUser.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(selectedUser.id)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                          >
                            Approve
                          </button>
                        )}
                        {selectedUser.status !== "rejected" && (
                          <button
                            onClick={() => handleReject(selectedUser.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-32 w-32 rounded-full object-cover border-4 border-[#4eb1ba]/20"
                            src={selectedUser.profile_image}
                            alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {selectedUser.first_name} {selectedUser.last_name}
                          </h3>
                          <p className="text-gray-600 mb-1">{selectedUser.email}</p>
                          <p className="text-gray-500 text-sm mb-3">
                            Registration Date: {formatDate(selectedUser.created_at)}
                          </p>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedUser.status)}`}>
                            Status: {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-[#4e2a5a] mb-2">Bio</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedUser.bio}
                        </p>
                      </div>

                      <div className="border-t pt-6 mt-6">
                        <h4 className="text-lg font-semibold text-[#4e2a5a] mb-4">Activity Log</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-800">User registered</p>
                              <p className="text-xs text-gray-500">{formatDate(selectedUser.created_at)}</p>
                            </div>
                          </div>
                          {selectedUser.status === "approved" && (
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 bg-green-100 rounded-full p-1">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-gray-800">Profile approved by admin</p>
                                <p className="text-xs text-gray-500">Just now</p>
                              </div>
                            </div>
                          )}
                          {selectedUser.status === "rejected" && (
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 bg-red-100 rounded-full p-1">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-gray-800">Profile rejected by admin</p>
                                <p className="text-xs text-gray-500">Just now</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-6 text-center text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="text-lg font-medium">No user selected</h3>
                    <p className="mt-1">Select a user from the list to view their profile details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminProtectedRoute>
  );
} 