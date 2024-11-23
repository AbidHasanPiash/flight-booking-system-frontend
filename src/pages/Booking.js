import React from "react";
import { useLocation } from "react-router-dom";

export default function Booking() {
    const location = useLocation();
    const { flight, selectedSeats } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmation</h1>

                {/* Flight Details */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">{flight.airline}</h2>
                    <p className="text-gray-600">Flight ID: {flight.id}</p>
                    <p className="text-gray-600">Route: {flight.origin} → {flight.destination}</p>
                    <p className="text-gray-600">Departure: {new Date(flight.departureDate).toLocaleString()}</p>
                    <p className="text-gray-600">Duration: {flight.duration}</p>
                    <p className="text-blue-600 text-lg font-bold">Price per Seat: ${flight.price.toFixed(2)}</p>
                </div>

                {/* Selected Seats */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700">Selected Seats</h3>
                    <p className="text-gray-600">
                        {selectedSeats && selectedSeats.length > 0
                            ? selectedSeats.join(", ")
                            : "No seats selected"}
                    </p>
                </div>

                {/* Passenger Details Form */}
                <form>
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Passenger Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
