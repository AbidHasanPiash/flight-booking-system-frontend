import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaDollarSign, FaChair } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import apiConfig from "../configs/apiConfig";
import { fetchData } from "../utils/axios";

const mockSeats = Array(30).fill(false).map((_, i) => ({
    id: i + 1,
    available: Math.random() > 0.2, // Randomly mark some seats as unavailable (80% availability)
}));

export default function FlightDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch flight details by ID
    const { isLoading, error, data: flight } = useQuery({
        queryKey: ["flight", id],
        queryFn: () => fetchData(apiConfig.GET_FLIGHT_BY_ID + id), // Ensure the endpoint is correct
        enabled: !!id, // Only run the query when ID is available
    });

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeatSelection = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId)); // Deselect
        } else {
            setSelectedSeats([...selectedSeats, seatId]); // Select
        }
    };

    const handleBookNow = () => {
        navigate("/booking", { state: { flight, selectedSeats } });
    };

    if (isLoading) {
        return <div className="text-center mt-10">Loading flight details...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">Failed to fetch flight details.</div>;
    }

    return (
        <div>
            {/* Parallax Section */}
            <div
                className="h-[40vh] md:h-[60vh] bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/images/emirates.avif')" }}
            >
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <h1 className="text-4xl text-white font-bold flex items-center gap-2">
                        <MdFlightTakeoff className="text-yellow-400" />
                        {flight.airline}
                    </h1>
                </div>
            </div>

            {/* Details Section */}
            <div className="mx-4">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg -mt-20 relative z-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Flight Information</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Origin */}
                        <div className="flex items-center gap-4">
                            <FaPlaneDeparture className="text-blue-600 text-2xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">From</h3>
                                <p className="text-gray-600">{flight.origin}</p>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="flex items-center gap-4">
                            <FaPlaneArrival className="text-blue-600 text-2xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">To</h3>
                                <p className="text-gray-600">{flight.destination}</p>
                            </div>
                        </div>

                        {/* Departure */}
                        <div className="flex items-center gap-4">
                            <FaClock className="text-blue-600 text-2xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Departure</h3>
                                <p className="text-gray-600">
                                    {new Date(flight.departureDate).toLocaleDateString()} -{" "}
                                    {new Date(flight.departureDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-4">
                            <FaClock className="text-blue-600 text-2xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Duration</h3>
                                <p className="text-gray-600">{flight.duration}</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <FaDollarSign className="text-blue-600 text-2xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Price</h3>
                                <p className="text-blue-600 text-xl font-bold">${flight.price.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Available Seats */}
                        <div className="flex items-center gap-4">
                            <FaChair className="text-blue-600 text-2xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Available Seats</h3>
                                <p className="text-gray-600">{flight.availableSeats} seats remaining</p>
                            </div>
                        </div>
                    </div>

                    {/* Seat Selection */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Seat</h2>
                        <div className="inline-flex flex-col gap-4 bg-gray-100 p-6 rounded-lg">
                            {Array.from({ length: 6 }, (_, rowIndex) => (
                                <div key={rowIndex} className="flex gap-4 items-center">
                                    {mockSeats.slice(rowIndex * 5, rowIndex * 5 + 5).map((seat) => (
                                        <button
                                            key={seat.id}
                                            className={`w-12 h-12 rounded-md text-white flex items-center justify-center ${seat.available
                                                    ? selectedSeats.includes(seat.id)
                                                        ? "bg-green-500 hover:bg-green-600"
                                                        : "bg-gray-300 hover:bg-gray-400"
                                                    : "bg-red-500 cursor-not-allowed"
                                                }`}
                                            disabled={!seat.available}
                                            onClick={() => toggleSeatSelection(seat.id)}
                                        >
                                            {seat.id}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-gray-600">
                            Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleBookNow}
                            className={`px-6 py-2 ${selectedSeats.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                } text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition`}
                            disabled={selectedSeats.length === 0}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
