"use client";

import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthForm } from "../../components/auth/AuthForm";

export default function RegisterPage() {
  const handleRegister = async (formData) => {
    console.log("Registration attempt:", formData);


    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      throw new Error("Passwords do not match");
    }

    
    if (!formData.email) {
      alert("Email is required!");
      throw new Error("Email is required");
    }

    try {
     
      const apiData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "USER" 
      };

      console.log("Sending to API:", apiData);

 
      const response = await fetch("https://api.freeapi.app/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        
       
        if (response.status === 422) {
          const errorMessage = responseData.message || 
            responseData.errors?.[0]?.msg || 
            "Validation failed. Please check your input data.";
          throw new Error(errorMessage);
        } else if (response.status === 400) {
          throw new Error(responseData.message || "Bad request. Please check your input.");
        } else if (response.status === 409) {
          throw new Error(responseData.message || "User already exists with this email or username.");
        } else {
          throw new Error(responseData.message || `Registration failed: ${response.status}`);
        }
      }

      console.log("Registration successful:", responseData);
      alert("Registration successful! You can now login to your account.");
      
      // Optional: Redirect to login page
      // window.location.href = "/login";

    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message}`);
      throw error;
    }
  };

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
            <AuthForm type="register" onSubmit={handleRegister} />

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