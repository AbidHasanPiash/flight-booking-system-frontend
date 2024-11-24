import React from "react";
import FlightForm from "../components/form/FlightForm";
import { useQuery } from "@tanstack/react-query";
import apiConfig from "../configs/apiConfig";
import { fetchData } from "../utils/axios";
import { format } from "date-fns";

export default function AdminDashboard() {
    const { isLoading: flightsLoading, data: flights } = useQuery({
        queryKey: ["flights"],
        queryFn: () => fetchData(apiConfig?.GET_FLIGHT),
    });

    const { isLoading: bookingsLoading, data: bookings } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => fetchData(apiConfig?.GET_BOOKING),
    });

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Flight Management */}
            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Flights</h2>
                <FlightForm />

                {/* Flights Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border px-4 py-2">Airline</th>
                                <th className="border px-4 py-2">Departure</th>
                                <th className="border px-4 py-2">Arrival</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Seats</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flightsLoading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">
                                        Loading flights...
                                    </td>
                                </tr>
                            ) : flights?.length > 0 ? (
                                flights.map((flight) => (
                                    <tr key={flight._id} className="bg-white hover:bg-gray-50">
                                        <td className="border px-4 py-2">{flight.airline}</td>
                                        <td className="border px-4 py-2">{flight.origin}</td>
                                        <td className="border px-4 py-2">{flight.destination}</td>
                                        <td className="border px-4 py-2">
                                            {format(new Date(flight.departureDate), "yyyy-MM-dd HH:mm")}
                                        </td>
                                        <td className="border px-4 py-2">${flight.price}</td>
                                        <td className="border px-4 py-2">{flight.availableSeats}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="text-blue-500 hover:underline mr-2"
                                                // onClick={() => onEditFlight(flight)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-500 hover:underline"
                                                // onClick={() => onDeleteFlight(flight._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">
                                        No flights available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Bookings Section */}
            <section className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border px-4 py-2">User</th>
                                <th className="border px-4 py-2">Flight</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingsLoading ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-4">
                                        Loading bookings...
                                    </td>
                                </tr>
                            ) : bookings?.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking.id} className="bg-white hover:bg-gray-50">
                                        <td className="border px-4 py-2">{booking.user}</td>
                                        <td className="border px-4 py-2">{booking.flight}</td>
                                        <td className="border px-4 py-2">{booking.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4">
                                        No bookings available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
