import React, { useState } from "react";

const mockUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
};

const mockPurchaseHistory = [
    {
        id: 1,
        flight: "Flight 101",
        origin: "New York",
        destination: "London",
        date: "2024-10-01",
        price: 450.00,
    },
    {
        id: 2,
        flight: "Flight 102",
        origin: "Toronto",
        destination: "Tokyo",
        date: "2024-09-15",
        price: 600.00,
    },
];

const mockCurrentBooking = {
    flight: "Flight 202",
    origin: "Paris",
    destination: "Dubai",
    date: "2024-12-15",
    price: 500.00,
    seats: ["A3", "B4"],
};

export default function UserProfile() {
    const [currentBooking, setCurrentBooking] = useState(mockCurrentBooking);

    const handleCancelBooking = () => {
        if (window.confirm("Are you sure you want to cancel your booking?")) {
            setCurrentBooking(null);
            alert("Your booking has been successfully canceled.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

                {/* User Information */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
                    <p className="text-gray-600">Name: {mockUserData.name}</p>
                    <p className="text-gray-600">Email: {mockUserData.email}</p>
                </div>

                {/* Current Booking */}
                {currentBooking ? (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700">Current Booking</h2>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-gray-700 font-medium">
                                Flight: {currentBooking.flight}
                            </p>
                            <p className="text-gray-600">
                                Route: {currentBooking.origin} → {currentBooking.destination}
                            </p>
                            <p className="text-gray-600">
                                Date: {new Date(currentBooking.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                Price: ${currentBooking.price.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                                Seats: {currentBooking.seats.join(", ")}
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
                    {mockPurchaseHistory.length > 0 ? (
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
                                {mockPurchaseHistory.map((history) => (
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
