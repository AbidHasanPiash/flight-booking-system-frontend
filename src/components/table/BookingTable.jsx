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
    )
}
