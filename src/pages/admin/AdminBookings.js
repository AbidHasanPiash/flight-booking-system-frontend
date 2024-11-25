import React from "react";
import BookingTable from "../../components/table/BookingTable";

export default function AdminBookings() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Bookings</h2>
            <BookingTable />
        </div>
    );
}
