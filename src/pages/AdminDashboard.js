import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen p-8 bg-gray-100">

            {/* Navigation Links */}
            <nav className="flex flex-col md:flex-row items-center justify-between pb-4">
                <Link to={'/admin'} className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</Link>
                <div className="space-x-2">
                    <Link to="/admin/flights" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> Manage Flights </Link>
                    <Link to="/admin/bookings" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" > Manage Bookings </Link>
                </div>
            </nav>

            {/* Nested Routes Render Here */}
            <div className="">
                <Outlet />
            </div>
        </div>
    );
}
