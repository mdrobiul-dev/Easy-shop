"use client";

import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthForm } from "../../components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join thousands of happy shoppers today!
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <AuthForm type="register" />
            
            <div className="mt-6">
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
