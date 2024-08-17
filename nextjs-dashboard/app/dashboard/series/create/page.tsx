"use client";
import React, { useState, useEffect } from "react";
import { newSeries } from "@/app/lib/data";
import { useRouter } from "next/navigation"; // Import useRouter

function Page({ params }) {
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await newSeries(formData);
      alert("Updated Successfully");
      location.reload(); // Refresh the dashboard

      // Optionally redirect or update state
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">New Series</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            onChange={handleChange}
            placeholder="Enter Series Name"
            name="name"
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Page;
