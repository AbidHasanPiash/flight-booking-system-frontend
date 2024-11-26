import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getUserId } from "../utils/getUserId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, updateData } from "../utils/axios";
import apiConfig from "../configs/apiConfig";

export default function UserProfile() {
    const queryClient = useQueryClient();
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

    const currentBooking = bookings?.[bookings.length - 1]; // Display the latest booking
    

    // Cancel mutation
    const cancelMutation = useMutation({
        mutationFn: (id) => updateData(apiConfig?.UPDATE_BOOKING + id, {status: 'cancelled'}), // API endpoint for deletion
        onSuccess: () => {
            // Invalidate flights query to refresh the table
            queryClient.invalidateQueries(["flightBookings"]);
        },
        onError: (error) => {
            console.error("Failed to delete flight:", error);
        },
    });

    // Delete flight handler
    const onCancelBooking = (id) => {
        if (window.confirm("Are you sure you want to Cancel this booking?")) {
            cancelMutation.mutate(id);
        }
    };
    

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

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
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4 mb-4">
                                    <FaPlaneDeparture className="text-blue-600 text-2xl" />
                                    <div>
                                        <p className="text-gray-700 font-medium">Flight: {currentBooking.flightId}</p>
                                        <p className="text-gray-600">Seats: {currentBooking.numberOfSeats}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onCancelBooking(currentBooking?._id)}
                                    disabled={currentBooking?.status === 'cancelled'}
                                    className="text-red-500 hover:bg-red-100 px-2 py-1 rounded-lg disabled:cursor-not-allowed">
                                    Cancel
                                </button>
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
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Flight ID
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Seats
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Date
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Total Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((history) => (
                                        <tr key={history._id} className="border-t">
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history.flightId}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history.numberOfSeats}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                {new Date(history.bookingDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap capitalize">
                                                <span className={history.status === 'confirmed' ? 'text-green-600' : 'text-red-600'}>{history.status}</span>
                                            </td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                ${history.totalPrice.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">No purchase history available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}