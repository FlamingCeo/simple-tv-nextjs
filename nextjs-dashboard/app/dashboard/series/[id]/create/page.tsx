"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

import {
  fetchSeriesById,
  saveSeasonById,
  saveSeason,
  newSeason,
} from "@/app/lib/data";

function Page({ params }) {
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState({ name: "", no: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSeriesById(params.id);
        setFormData({ series_name: data.name });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
  }, [params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      formData["series_id"] = parseInt(params.id);
      formData["no"] = parseInt(formData["no"]);

      await newSeason(formData);
      alert("Updated Successfully");
      location.reload(); // Refresh the dashboard

      // Handle successful submission (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-blue-500 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        create Season
      </h1>
      <div>For {formData.series_name}</div>
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
            placeholder="Enter Season Name"
            name="name"
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Name
          </label>
          <input
            id="no"
            type="number"
            onChange={handleChange}
            placeholder="Enter Season Number"
            name="no"
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
