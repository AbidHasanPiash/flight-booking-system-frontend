import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getUserId } from "../utils/getUserId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, updateData } from "../utils/axios";
import apiConfig from "../configs/apiConfig";
import Spinner from "../components/common/Spinner";

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

    const now = new Date();
    // Find the most recent flight with a departure date in the future
    const currentBooking = bookings
    ?.filter((booking) => 
        new Date(booking?.flightDetails?.departureDate) > now && booking.status !== 'cancelled'
    ) // Filter for future departures and non-cancelled bookings
    ?.sort((a, b) => new Date(a.flightDetails.departureDate) - new Date(b.flightDetails.departureDate)) // Sort by earliest departure
    ?.at(0); // Get the earliest upcoming flight


    // Cancel mutation
    const cancelMutation = useMutation({
        mutationFn: (id) => updateData(apiConfig?.UPDATE_BOOKING + id, { status: 'cancelled' }), // API endpoint for deletion
        onSuccess: () => {
            // Invalidate flights query to refresh the table
            queryClient.invalidateQueries(["flightBookings"]);
        },
        onError: (error) => {
            console.error("Failed to delete flight:", error);
        },
    });

    // Delete flight handler
    const onCancelBooking = (id, departureDate) => {
        const now = new Date(); // Current time
        const departureTime = new Date(departureDate); // Convert departureDate to Date object

        // Calculate the time difference in milliseconds
        const timeDifference = departureTime - now;

        // Check if the departure time is within 1 hour
        if (timeDifference <= 60 * 60 * 1000) { // 1 hour in milliseconds
            alert("Bookings can only be canceled at least 1 hour before the departure time.");
            return;
        }

        // Proceed with cancellation if the condition is satisfied
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            cancelMutation.mutate(id);
        }
    };


    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg p-4">
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
                </div>

                {/* Current Booking */}
                <div className="my-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Booking</h2>
                    {currentBooking ? (
                        <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-md rounded-xl border border-blue-300 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4 mb-4">
                                    <FaPlaneDeparture className="text-blue-500 text-3xl" />
                                    <div>
                                        <p className="text-lg text-gray-800 font-bold">
                                            Flight: {currentBooking?.flightDetails?.flightNumber}
                                        </p>
                                        <p className="text-gray-600 font-medium">
                                            Seats: {currentBooking.numberOfSeats}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onCancelBooking(currentBooking?._id, currentBooking?.flightDetails?.departureDate)}
                                    disabled={currentBooking?.status === 'cancelled'}
                                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    { cancelMutation.isPending ? <p className="flex items-center space-x-2"><Spinner size="4"/>  <span>Canceling..</span> </p> : 'Cancel Booking'}
                                </button>
                            </div>

                            <div className="mt-4">
                                <p className="flex items-center text-gray-700 text-sm gap-2">
                                    <strong className="text-gray-800">Airline:</strong> {currentBooking.flightDetails?.airline}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm gap-2">
                                    <strong className="text-gray-800">Origin:</strong> {currentBooking.flightDetails?.origin}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm gap-2">
                                    <strong className="text-gray-800">Destination:</strong> {currentBooking.flightDetails?.destination}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm gap-2">
                                    <strong className="text-gray-800">Booking Date:</strong>
                                    {new Date(currentBooking?.bookingDate).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm gap-2">
                                    <strong className="text-gray-800">Travel Date:</strong>
                                    {new Date(currentBooking?.flightDetails?.departureDate).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm gap-2">
                                    <strong className="text-gray-800">Total Price:</strong> ${currentBooking.totalPrice.toFixed(2)}
                                </p>
                                <p className="flex items-center text-sm font-medium gap-2">
                                    <strong className="text-gray-800">Status:</strong>
                                    <span
                                        className={`px-3 py-1 rounded-full ${currentBooking.status === 'confirmed'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {currentBooking.status}
                                    </span>
                                </p>
                            </div>
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
                                            Flight No.
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Airline
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Origin
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Destination
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Seats
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Departure Date
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-medium whitespace-nowrap">
                                            Booking Date
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
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history?.flightDetails?.flightNumber}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history?.flightDetails?.airline}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history?.flightDetails?.origin}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history?.flightDetails?.destination}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{history.numberOfSeats}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                {/* Format the departureDate to include both date and time */}
                                                {new Date(history?.flightDetails?.departureDate).toLocaleString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </td>
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