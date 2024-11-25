import React from "react";
import { Link } from "react-router-dom";
import FlightTable from "../../components/table/FlightTable";

export default function AdminFlights() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Flights</h2>
            <Link
                to="create"
                className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Add New Flight
            </Link>
            <FlightTable />
        </div>
    );
}
