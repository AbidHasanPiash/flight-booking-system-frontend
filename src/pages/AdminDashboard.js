import React from "react";
import FlightForm from "../components/form/FlightForm";
import FlightTable from "../components/table/FlightTable";
import BookingTable from "../components/table/BookingTable";

export default function AdminDashboard() {

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Flight Management */}
            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Flights</h2>
                <FlightForm />

                {/* Flights Table */}
                <FlightTable/>
            </section>

            {/* Bookings Section */}
            <section className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings</h2>
                <BookingTable/>
            </section>
        </div>
    );
}
