import React from "react";

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
                    <h1 className="text-4xl text-white font-bold">{flight.airline}</h1>
                </div>
            </div>

            {/* Details Section */}
            <div className="mx-4">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg -mt-20 relative z-10">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Flight Information</h1>

                    {/* Airline Info */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-blue-600">{flight.airline}</h2>
                        <p className="text-gray-600">Flight ID: {flight.id}</p>
                    </div>

                    {/* Flight Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Origin and Destination */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Route</h3>
                            <p className="text-gray-600">
                                <strong>From:</strong> {flight.origin}
                            </p>
                            <p className="text-gray-600">
                                <strong>To:</strong> {flight.destination}
                            </p>
                        </div>

                        {/* Departure Date */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Departure</h3>
                            <p className="text-gray-600">
                                <strong>Date:</strong> {new Date(flight.departureDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Time:</strong> {new Date(flight.departureDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>

                        {/* Duration */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Duration</h3>
                            <p className="text-gray-600">{flight.duration}</p>
                        </div>

                        {/* Price */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Price</h3>
                            <p className="text-blue-600 text-xl font-bold">${flight.price.toFixed(2)}</p>
                        </div>

                        {/* Available Seats */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Available Seats</h3>
                            <p className="text-gray-600">{flight.availableSeats} seats remaining</p>
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
