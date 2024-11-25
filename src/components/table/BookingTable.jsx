import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/axios";
import apiConfig from "../../configs/apiConfig";

export default function BookingTable() {
    const { isLoading: bookingsLoading, data: bookings } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => fetchData(apiConfig?.GET_BOOKING),
    });

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border px-4 py-2">User ID</th>
                        <th className="border px-4 py-2">Flight ID</th>
                        <th className="border px-4 py-2">Number of Seats</th>
                        <th className="border px-4 py-2">Total Price</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Booking Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsLoading ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                Loading bookings...
                            </td>
                        </tr>
                    ) : bookings?.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking._id} className="bg-white hover:bg-gray-50">
                                <td className="border px-4 py-2">{booking.userId}</td>
                                <td className="border px-4 py-2">{booking.flightId}</td>
                                <td className="border px-4 py-2">{booking.numberOfSeats}</td>
                                <td className="border px-4 py-2">${booking.totalPrice.toFixed(2)}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                                <td className="border px-4 py-2">
                                    {new Date(booking.bookingDate).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                No bookings available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
