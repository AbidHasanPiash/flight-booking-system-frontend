import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import flightDateConfig from "../../configs/flightDateConfig";

export default function SearchCard() {
    const navigate = useNavigate();

    // State for search inputs
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [travelDate, setTravelDate] = useState("");

    // Handle search button click
    const handleSearch = () => {
        if (origin && destination && travelDate) {
            navigate(`/flights?origin=${encodeURIComponent(origin.toUpperCase())}&destination=${encodeURIComponent(destination.toUpperCase())}&date=${encodeURIComponent(travelDate)}`);
        } else {
            alert("Please fill out all fields!");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg w-full bg-white text-gray-950 p-4 shadow-lg">
            {/* From Section */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Origin</p>
                    <FaPlaneDeparture className="text-blue-500" />
                </div>
                <input
                    type="text"
                    placeholder="Enter origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* To Section */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Destination</p>
                    <FaPlaneArrival className="text-blue-500" />
                </div>
                <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Travel Date Section */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Travel Date</p>
                    <FaRegCalendarAlt className="text-blue-500" />
                </div>
                <input
                    type="date"
                    value={travelDate}
                    min={flightDateConfig?.minDate}
                    max={flightDateConfig?.maxDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center">
                <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
                >
                    <RiSearchLine className="text-lg" />
                    <span className="font-medium">Search</span>
                </button>
            </div>
        </div>
    );
}
