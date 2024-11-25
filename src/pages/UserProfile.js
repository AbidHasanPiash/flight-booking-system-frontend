import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getUserId } from "../utils/getUserId";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/axios";
import apiConfig from "../configs/apiConfig";

export default function UserProfile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const userIFromToken = getUserId();

    // Fetch flight details by ID
    const { isLoading, data: flight } = useQuery({
        queryKey: ["flight", userIFromToken],
        queryFn: () => fetchData(apiConfig.GET_BOOKING_BY_USER_ID + userIFromToken), // Ensure the endpoint is correct
        enabled: !!userIFromToken, // Only run the query when ID is available
    });

    const [currentBooking, setCurrentBooking] = useState({
        flight: "Flight 202",
        origin: "Paris",
        destination: "Dubai",
        date: "2024-12-15",
        price: 500.00,
        seats: ["A3", "B4"],
    });

    const handleCancelBooking = () => {
        if (window.confirm("Are you sure you want to cancel your booking?")) {
            setCurrentBooking(null);
            alert("Your booking has been successfully canceled.");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
                        <Link to={'edit'}>Edit</Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* User Information */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
                    <p className="text-gray-600">Name: {user.username}</p>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-600">Role: {user.role}</p>
                </div>

                {/* Current Booking */}
                {currentBooking ? (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700">Current Booking</h2>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-4 mb-4">
                                <FaPlaneDeparture className="text-blue-600 text-2xl" />
                                <div>
                                    <p className="text-gray-700 font-medium">
                                        {currentBooking.flight}
                                    </p>
                                    <p className="text-gray-600">
                                        {currentBooking.origin} → {currentBooking.destination}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                <strong>Date:</strong> {new Date(currentBooking.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Price:</strong> ${currentBooking.price.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                                <strong>Seats:</strong> {currentBooking.seats.join(", ")}
                            </p>
                            <button
                                onClick={handleCancelBooking}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700">Current Booking</h2>
                        <p className="text-gray-600">No active bookings at the moment.</p>
                    </div>
                )}

                {/* Purchase History */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Purchase History</h2>
                    {flight && flight.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Flight</th>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Route</th>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Date</th>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flight.map((history) => (
                                    <tr key={history.id} className="border-t">
                                        <td className="px-4 py-2 text-gray-700">{history.flight}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {history.origin} → {history.destination}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {new Date(history.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">${history.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No purchase history available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}