import React from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../utils/axios";
import apiConfig from "../configs/apiConfig";
import { useMutation } from "@tanstack/react-query";
import { getUserId } from "../utils/getUserId";

export default function Booking() {
    const location = useLocation();
    const { flight, selectedSeats } = location.state || {};
    const userIFromToken = getUserId();

    const initialValues = {
        userId: userIFromToken,
        flightId: flight?._id,
        numberOfSeats: selectedSeats?.length || 0,
        totalPrice: flight?.price * (selectedSeats?.length || 0), // Calculate total price
        bookingDate: new Date().toISOString(), // Set current date and time
        status: "confirmed"
    };

    const onSubmit = async (data) => {
        await postData(apiConfig.CREATE_BOOKING, data);
    };

    const mutation = useMutation({
        mutationKey: ["booking"],
        mutationFn: () => onSubmit(initialValues),
        // onSuccess, // You can add success logic here
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmation</h1>

                {/* Flight Details */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600">{flight?.airline}</h2>
                    <p className="text-gray-600">Flight ID: {flight?._id}</p>
                    <p className="text-gray-600">Route: {flight?.origin} → {flight?.destination}</p>
                    <p className="text-gray-600">Departure: {new Date(flight?.departureDate).toLocaleString()}</p>
                    <p className="text-gray-600">Duration: {flight?.duration}</p>
                    <p className="text-blue-600 text-lg font-bold">Price per Seat: ${flight?.price.toFixed(2)}</p>
                </div>

                <div>
                    user: {userIFromToken}
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

                {/* Confirm Booking Button */}
                <div className="mt-6">
                    <button
                        onClick={() => mutation.mutate()}
                        className={`px-6 py-2 ${selectedSeats && selectedSeats.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                            } text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition`}
                        disabled={!selectedSeats || selectedSeats.length === 0}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
