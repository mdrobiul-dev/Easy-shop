"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthForm({ type = "login" }) {
  const isLogin = type === "login";
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
   
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let apiUrl, requestBody;

      if (type === "login") {
        apiUrl = "https://api.freeapi.app/api/v1/users/login";
        requestBody = {
          username: formData.username,
          password: formData.password
        };
      } else {
        apiUrl = "https://api.freeapi.app/api/v1/users/register";
        requestBody = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        };
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (type === "login") {
          alert("Login successful! Redirecting...");
          router.push("/");
          router.refresh();
        } else {
          alert("Registration successful! Please login.");
          router.push("/auth/login");
        }
      } else {
        throw new Error(data.message || `Failed to ${type}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || `Something went wrong during ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

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
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 focus:outline-none"
            placeholder="you@example.com"
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

      {/* Role Field - ONLY show for register */}
      {!isLogin && (
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 focus:outline-none"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      )}

      {/* Remember me and Forgot Password - ONLY show for login */}
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

      {/* Submit Button */}
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

      {/* Switch between Login and Register links */}
      <div className="text-center">
        <span className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link 
            href={isLogin ? "/auth/register" : "/auth/login"} 
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Link>
        </span>
      </div>
    </form>
  );
}