"use client";
import React, { useState, useEffect } from "react";
import {
  viewDashboard,
  updatePaymentAmount,
  updateGrant,
} from "@/app/lib/data";

function Page({ seasonId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await viewDashboard();
        setPayments(data.payments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, [seasonId]);
  async function grantAccessToSeason(payment) {
    await updateGrant(payment);
    const data = await viewDashboard();
    setPayments(data.payments);
    setLoading(false);
    alert(`Access granted to Season ` + payment.season_name);
  }
  const handlePaymentChange = (id, newAmount) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, amount: newAmount } : payment
      )
    );
  };

  const handlePaymentUpdate = async (id, newAmount) => {
    try {
      await updatePaymentAmount(id, newAmount);
      alert("Payment amount updated successfully.");
    } catch (error) {
      console.error("Error updating payment amount:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-blue-500 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Admin Dashboard
      </h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Client Name</th>
            <th className="py-2 px-4 border-b">Season</th>
            <th className="py-2 px-4 border-b">Series</th>
            <th className="py-2 px-4 border-b">Total Payment Amount</th>
            <th className="py-2 px-4 border-b">Have Access?</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="py-2 px-4 border-b">{payment.email}</td>
              <td className="py-2 px-4 border-b">{payment.season_name}</td>
              <td className="py-2 px-4 border-b">{payment.series_name}</td>
              <td className="py-2 px-4 border-b">
                <div className="relative group">
                  <input
                    type="number"
                    value={payment.amount}
                    onChange={(e) =>
                      handlePaymentChange(payment.id, e.target.value)
                    }
                    className="w-24 p-1 border border-gray-300 rounded-md"
                  />
                  <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Payment Date: {payment.paymentDate} */}
                    <br />
                    Amount: ${payment.amount}
                  </div>
                </div>
              </td>
              <td>
                <span
                  className={`${
                    payment.status
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  } text-white px-3 py-1 rounded-full`}
                >
                  {payment.status ? "Yes" : "No"}
                </span>
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() =>
                    handlePaymentUpdate(payment.id, payment.amount)
                  }
                  className="bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none"
                >
                  Update
                </button>
                <button
                  onClick={() => grantAccessToSeason(payment)}
                  className={`${
                    payment.status ? "bg-red-500" : "bg-green-500"
                  } mt-4 text-white p-2 rounded-md font-semibold hover:bg-opacity-90 focus:outline-none`}
                >
                  {payment.status ? "Remove " : "Grant "}
                  Access
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Page;
