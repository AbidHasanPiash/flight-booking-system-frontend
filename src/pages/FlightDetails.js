import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaDollarSign, FaChair } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";

const mockFlightData = {
    id: 4,
    airline: "Sample Airlines",
    origin: "Canada",
    destination: "New York",
    departureDate: "2024-11-25T00:00:00.000Z",
    price: 349.99,
    availableSeats: 120,
    duration: "4h 15m",
};

export default function FlightDetails() {
    const flight = mockFlightData;

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

                    {/* Flight Details */}
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

                    {/* Call to Action */}
                    <div className="mt-6 flex justify-end">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
