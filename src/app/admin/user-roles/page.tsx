"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { createUserRole } from "@/lib/auth";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import Header from "@/components/Header";

export default function UserRolesAdmin() {
  const [databaseStatus, setDatabaseStatus] = useState<string>("Checking...");
  const [fixStatus, setFixStatus] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    checkDatabase();
    loadUsers();
  }, []);

  async function checkDatabase() {
    try {
      // Check database schema
      const { error: checkError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .limit(1);

      if (checkError) {
        if (checkError.message.includes('relation "user_roles" does not exist')) {
          setDatabaseStatus("Table missing: user_roles table doesn't exist");
        } else if (checkError.message.includes('bigint')) {
          setDatabaseStatus("Type error: user_id has wrong type (bigint instead of UUID)");
        } else {
          setDatabaseStatus(`Error: ${checkError.message}`);
        }
      } else {
        setDatabaseStatus("OK: Database schema looks correct");
      }
    } catch (error: any) {
      setDatabaseStatus(`Error checking database: ${error.message}`);
    }
  }

  async function loadUsers() {
    try {
      setLoading(true);
      // Get users from auth.users (requires admin access)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) {
        console.error("Error loading users:", authError);
        console.log("Error loading users:", authError);
        // Fallback - just check the current user
        if (session?.user) {
          setUsers([{
            id: session.user.id,
            email: session.user.email,
            role: session.user.role
          }]);
        }
      } else if (authUsers) {
        console.log("authuser", authUsers);
        setUsers(authUsers.users.map(user => ({
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role || "Not assigned"
        })));
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fixDatabase() {
    try {
      setFixStatus("Attempting to fix database schema...");
      // Try to call the create_user_roles_table function
      const { error } = await supabase.rpc('create_user_roles_table');

      if (error) {
        console.error("Error fixing database:", error);
        setFixStatus(`Error: ${error.message}`);

        // Show manual fix instructions
        alert(`
          Please run the following SQL in your Supabase SQL Editor:
          
          CREATE TABLE IF NOT EXISTS public.user_roles (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE(user_id)
          );
        `);
      } else {
        setFixStatus("Database schema fixed successfully!");
        // Recheck database
        checkDatabase();
      }
    } catch (error: any) {
      setFixStatus(`Error: ${error.message}`);
    }
  }

  async function fixUserRole(userId: string) {
    try {
      const result = await createUserRole(userId);
      if (result.success) {
        alert(`Role fixed for user ${userId}`);
        loadUsers();
      } else {
        alert(`Failed to fix role: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <AdminProtectedRoute>
      <main className="flex flex-col min-h-screen">
        <Header activePage="admin" />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#4e2a5a] mb-6">User Roles Management</h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Database Status</h2>
            <div className="flex items-center mb-4">
              <div className={`w-4 h-4 rounded-full mr-2 ${databaseStatus.startsWith("OK") ? "bg-green-500" : "bg-red-500"
                }`}></div>
              <p>{databaseStatus}</p>
            </div>

            {!databaseStatus.startsWith("OK") && (
              <button
                onClick={fixDatabase}
                className="px-4 py-2 bg-[#4e2a5a] text-white rounded hover:bg-[#3d2147]"
              >
                Fix Database Schema
              </button>
            )}

            {fixStatus && (
              <p className="mt-2 text-sm">
                {fixStatus}
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Roles</h2>

            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => fixUserRole(user.id)}
                            className="text-[#4eb1ba] hover:text-[#4e2a5a]"
                          >
                            Fix Role
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </AdminProtectedRoute>
  );
} 