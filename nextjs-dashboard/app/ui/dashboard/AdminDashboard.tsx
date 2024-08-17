"use client";
import React, { useState, useEffect } from "react";

export default function Page({ params }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Replace this with your actual data fetching logic
        const data = await fetchPaymentsFromAPI(params.seasonId);
        setPayments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, [params.seasonId]);

  const handleChange = (id, event) => {
    const { value } = event.target;
    setPayments((prevPayments) =>
      prevPayments.map((client) =>
        client.id === id ? { ...client, paymentAmount: Number(value) } : client
      )
    );
  };

  const handleSubmit = async (id) => {
    try {
      const payment = payments.find((client) => client.id === id);
      // Replace this with your actual update logic
      await savePaymentToAPI(id, payment);
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const handleGrantAccess = (id) => {
    // Add logic to grant access based on the payment
    console.log(`Access granted to client ID: ${id}`);
  };

  if (loading) {
    return <div className="text-center text-blue-500 text-lg">Loading...</div>;
  }

  const totalPaymentAmount = payments.reduce(
    (acc, client) => acc + client.paymentAmount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Admin Dashboard
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Total Payment Amount: ${totalPaymentAmount}
        </h2>
        <ul className="mt-4">
          {payments.map((client) => (
            <li key={client.id} className="mb-4">
              <div className="flex justify-between items-center">
                <span>{client.name}</span>
                <span className="relative group">
                  ${client.paymentAmount}
                  <div className="absolute left-0 top-6 bg-gray-100 p-2 rounded shadow-lg hidden group-hover:block">
                    <p>Date: {client.paymentDate}</p>
                    <p>Amount: ${client.paymentAmount}</p>
                  </div>
                </span>
                <button
                  className="ml-4 p-2 bg-green-500 text-white rounded"
                  onClick={() => handleGrantAccess(client.id)}
                >
                  Grant Access
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          Edit Payment Amounts
        </h2>
        <ul className="mt-4">
          {payments.map((client) => (
            <li key={client.id} className="mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(client.id);
                }}
                className="flex justify-between items-center"
              >
                <span>{client.name}</span>
                <input
                  type="number"
                  value={client.paymentAmount}
                  onChange={(e) => handleChange(client.id, e)}
                  placeholder="Enter Amount"
                  className="border p-2 rounded"
                />
                <button
                  type="submit"
                  className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Placeholder functions for data fetching and saving
async function fetchPaymentsFromAPI(seasonId) {
  // Fetch payment data based on the season ID
  return [
    {
      id: 1,
      name: "Client 1",
      paymentAmount: 100,
      paymentDate: "2024-08-15",
    },
    {
      id: 2,
      name: "Client 2",
      paymentAmount: 200,
      paymentDate: "2024-08-10",
    },
  ];
}

async function savePaymentToAPI(id, payment) {
  // Save the updated payment details for the client
  console.log(`Saving payment for client ID: ${id}`, payment);
}
