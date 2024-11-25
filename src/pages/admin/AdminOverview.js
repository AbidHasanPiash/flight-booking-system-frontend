import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/axios";
import apiConfig from "../../configs/apiConfig";

export default function AdminOverview() {
    // Fetch total flights
    const { data: totalFlights, isLoading: flightsLoading } = useQuery({
        queryKey: ["totalFlights"],
        queryFn: () => fetchData(apiConfig.GET_TOTAL_FLIGHTS),
    });

    // Fetch total bookings
    const { data: totalBookings, isLoading: bookingsLoading } = useQuery({
        queryKey: ["totalBookings"],
        queryFn: () => fetchData(apiConfig.GET_TOTAL_BOOKINGS),
    });

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Flights */}
                <div className="bg-blue-100 p-4 rounded-lg shadow-lg flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800">Total Flights</h3>
                        {flightsLoading ? (
                            <p className="text-blue-600">Loading...</p>
                        ) : (
                            <p className="text-2xl font-bold text-blue-900">{totalFlights?.count || 0}</p>
                        )}
                    </div>
                    <i className="fas fa-plane-departure text-4xl text-blue-500"></i>
                </div>

                {/* Total Bookings */}
                <div className="bg-green-100 p-4 rounded-lg shadow-lg flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-green-800">Total Bookings</h3>
                        {bookingsLoading ? (
                            <p className="text-green-600">Loading...</p>
                        ) : (
                            <p className="text-2xl font-bold text-green-900">{totalBookings?.count || 0}</p>
                        )}
                    </div>
                    <i className="fas fa-ticket-alt text-4xl text-green-500"></i>
                </div>
            </div>

            {/* Overview Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Overview</h3>
                <p className="text-gray-600 mb-2">
                    Welcome! This dashboard provides insights into your application's flight and booking statistics. Use the navigation links to manage resources efficiently.
                </p>
                <p className="text-gray-600">
                    Navigate to the "Manage Flights" section to add, edit, or delete flights, or go to the "Manage Bookings" section to handle customer bookings.
                </p>
            </div>
        </div>
    );
}
