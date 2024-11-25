import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import apiConfig from "../../configs/apiConfig";
import { deleteData, fetchData } from "../../utils/axios"; // Add deleteData utility
import { Link } from "react-router-dom";

export default function FlightTable() {
    const queryClient = useQueryClient();

    // Fetch flights data
    const { isLoading: flightsLoading, data: flights } = useQuery({
        queryKey: ["flights"],
        queryFn: () => fetchData(apiConfig?.GET_FLIGHT),
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteData(apiConfig?.DELETE_FLIGHT, id), // API endpoint for deletion
        onSuccess: () => {
            // Invalidate flights query to refresh the table
            queryClient.invalidateQueries(["flights"]);
        },
        onError: (error) => {
            console.error("Failed to delete flight:", error);
        },
    });

    // Delete flight handler
    const onDeleteFlight = (id) => {
        if (window.confirm("Are you sure you want to delete this flight?")) {
            deleteMutation.mutate(id);
        }
    };

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
                                    <Link
                                        to={`edit/${flight?._id}`}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => onDeleteFlight(flight._id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        {deleteMutation.isLoading ? "Deleting..." : "Delete"}
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
    );
}
