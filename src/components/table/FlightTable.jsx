import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import apiConfig from "../../configs/apiConfig";
import { fetchData } from "../../utils/axios";

export default function FlightTable() {
    const { isLoading: flightsLoading, data: flights } = useQuery({
        queryKey: ["flights"],
        queryFn: () => fetchData(apiConfig?.GET_FLIGHT),
    });
    return (
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
    )
}
