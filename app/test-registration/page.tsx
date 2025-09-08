"use client";

import { useState } from "react";

export default function TestRegistration() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testDirectFetch = async () => {
    setLoading(true);
    setResult("");
    
    try {
      console.log("Making direct fetch to backend...");
      
      const url = "http://localhost:4000/api/v1/auth/register/company";
      console.log("Direct fetch URL:", url);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "Direct",
          lastName: "Test",
          email: "direct@test.com",
          password: "password123",
          companyName: "Direct Test Co"
        }),
      });

      console.log("Direct fetch response status:", response.status);
      console.log("Direct fetch response headers:", Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log("Direct fetch response data:", data);
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Direct fetch error:", error);
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Registration</h1>
      
      <button
        onClick={testDirectFetch}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mb-4"
      >
        {loading ? "Testing..." : "Test Direct Fetch"}
      </button>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Result:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {result || "No result yet"}
        </pre>
      </div>
    </div>
  );
}