import React from "react";
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
    const userIdFromToken = getUserId();

    // Fetch flight bookings by user ID
    const { isLoading, data: bookings } = useQuery({
        queryKey: ["flightBookings", userIdFromToken],
        queryFn: () => fetchData(apiConfig.GET_BOOKING_BY_USER_ID + userIdFromToken),
        enabled: !!userIdFromToken,
    });

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    const currentBooking = bookings?.[bookings.length - 1]; // Display the latest booking

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
                        <Link to={'edit'} className="text-blue-600 hover:underline">
                            Edit Profile
                        </Link>
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
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700">Current Booking</h2>
                    {currentBooking ? (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-4 mb-4">
                                <FaPlaneDeparture className="text-blue-600 text-2xl" />
                                <div>
                                    <p className="text-gray-700 font-medium">Flight: {currentBooking.flightId}</p>
                                    <p className="text-gray-600">Seats: {currentBooking.numberOfSeats}</p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                <strong>Date:</strong> {new Date(currentBooking.bookingDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Total Price:</strong> ${currentBooking.totalPrice.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                                <strong>Status:</strong> {currentBooking.status}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-600">No active bookings at the moment.</p>
                    )}
                </div>

                {/* Purchase History */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Purchase History</h2>
                    {bookings && bookings.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Flight ID</th>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Seats</th>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Date</th>
                                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((history) => (
                                    <tr key={history._id} className="border-t">
                                        <td className="px-4 py-2 text-gray-700">{history.flightId}</td>
                                        <td className="px-4 py-2 text-gray-700">{history.numberOfSeats}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {new Date(history.bookingDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">${history.totalPrice.toFixed(2)}</td>
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