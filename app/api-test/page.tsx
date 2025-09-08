"use client";

import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/constants";
import { getRegistrationEndpoint } from "@/lib/user-types.config";
import { UserType } from "@/types/auth.types";

export default function ApiTestPage() {
  const testRegistration = async () => {
    const userType = UserType.COMPANY;
    const endpoint = getRegistrationEndpoint(userType);
    const fullUrl = `${NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
    
    console.log("API Test - Full URL:", fullUrl);
    console.log("API Test - Backend URL:", NEXT_PUBLIC_BACKEND_URL);
    console.log("API Test - Endpoint:", endpoint);
    
    // Make a test request
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test-debug@company.com",
          password: "testpassword123",
          firstName: "Debug",
          lastName: "Test",
          companyName: "Debug Company"
        }),
      });
      
      const result = await response.json();
      console.log("API Test - Response:", result);
      
      if (response.ok) {
        alert("✅ API test successful! Check console for details.");
      } else {
        alert("❌ API test failed. Check console for details.");
      }
    } catch (error) {
      console.error("API Test - Error:", error);
      alert("❌ Network error. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Configuration Test</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Configuration</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-gray-400">Backend URL:</span>
              <span className="text-green-400 ml-2">{NEXT_PUBLIC_BACKEND_URL}</span>
            </div>
            <div>
              <span className="text-gray-400">Company Endpoint:</span>
              <span className="text-blue-400 ml-2">{getRegistrationEndpoint(UserType.COMPANY)}</span>
            </div>
            <div>
              <span className="text-gray-400">Full URL:</span>
              <span className="text-yellow-400 ml-2">{NEXT_PUBLIC_BACKEND_URL}{getRegistrationEndpoint(UserType.COMPANY)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={testRegistration}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Test Company Registration API
        </button>
        
        <div className="mt-8 text-sm text-gray-400">
          <p>This page will test the API configuration and make a real request to the backend.</p>
          <p>Check the browser console and network tab for detailed information.</p>
        </div>
      </div>
    </div>
  );
}