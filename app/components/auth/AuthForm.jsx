"use client";

import { useState } from "react";
import Link from "next/link";

export function AuthForm({ type = "login", onSubmit }) {
  const isLogin = type === "login";
  
  const [formData, setFormData] = useState({
    username: "",
    ...(isLogin ? {} : { email: "" }), 
    password: "",
    ...(isLogin ? {} : { confirmPassword: "" })
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field - Show for both login and register */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 focus:outline-none"
          placeholder="Enter your username"
        />
      </div>

      {/* Email Field - ONLY show for register */}
      {!isLogin && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required={!isLogin}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
      )}

      {/* Password Field - Show for both */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 focus:outline-none"
          placeholder="••••••••"
          minLength={6}
        />
      </div>

      {/* Confirm Password Field - ONLY show for register */}
      {!isLogin && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required={!isLogin}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 focus:outline-none"
            placeholder="••••••••"
            minLength={6}
          />
        </div>
      )}

      {isLogin && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-500">
            Forgot password?
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
            {isLogin ? "Signing in..." : "Creating account..."}
          </div>
        ) : (
          isLogin ? "Sign in" : "Create account"
        )}
      </button>

      {isLogin && (
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up
            </Link>
          </span>
        </div>
      )}

      {!isLogin && (
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign in
            </Link>
          </span>
        </div>
      )}
    </form>
  );
}