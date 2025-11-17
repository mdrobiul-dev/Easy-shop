"use client";

import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthForm } from "../../components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <AuthForm type="login" />
          </div>
        </div>
      </div>
    </div>
  );
}