import React, { useState } from "react";
import FlightForm from "../components/form/FlightForm";

export default function AdminDashboard() {
    const [flights, setFlights] = useState([]);
    const [bookings, setBookings] = useState([]);

    const fetchBookings = () => {
        setBookings([
            { id: 1, user: "John Doe", flight: "Flight 101", status: "Confirmed" },
            { id: 2, user: "Jane Smith", flight: "Flight 202", status: "Pending" },
        ]);
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Flight Management */}
            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Flights</h2>
                <FlightForm/>

                {/* Flights Table */}
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border px-4 py-2">Airline</th>
                            <th className="border px-4 py-2">Departure</th>
                            <th className="border px-4 py-2">Arrival</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight.id} className="bg-white hover:bg-gray-50">
                                <td className="border px-4 py-2">{flight.airline}</td>
                                <td className="border px-4 py-2">{flight.departure}</td>
                                <td className="border px-4 py-2">{flight.arrival}</td>
                                <td className="border px-4 py-2">{flight.date}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:underline mr-2"
                                        // onClick={() => onEditFlight(flight)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        // onClick={() => onDeleteFlight(flight.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Bookings Section */}
            <section className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                    onClick={fetchBookings}
                >
                    View Bookings
                </button>
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border px-4 py-2">User</th>
                            <th className="border px-4 py-2">Flight</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="bg-white hover:bg-gray-50">
                                <td className="border px-4 py-2">{booking.user}</td>
                                <td className="border px-4 py-2">{booking.flight}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
