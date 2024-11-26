import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import * as Yup from "yup";
import { RiPlaneFill, RiPriceTag3Fill, RiSearchLine, RiTimeFill } from "react-icons/ri"; // Import React Icons
import { useFormWithMutation } from "../utils/useFormWithMutation";
import { useSearchParams } from "react-router-dom";
import flightDateConfig from "../configs/flightDateConfig";
import FlightBookingCard from "../components/card/FlightBookingCard";
import apiConfig from "../configs/apiConfig";
import { fetchData } from "../utils/axios";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortOption, setSortOption] = useState("price"); // Default sort option

    // Extract query parameters
    const origin = searchParams.get("origin") || "Iran";
    const destination = searchParams.get("destination") || "Los Angeles";
    const date = searchParams.get("date") || flightDateConfig?.currentDate;

    // Fetch flights data based on query parameters
    const { isLoading: flightsLoading, data: flights } = useQuery({
        queryKey: ["flights", { origin, destination, date }],
        queryFn: () => fetchData(`${apiConfig?.GET_FLIGHT}?origin=${origin}&destination=${destination}&date=${date}`),
        enabled: !!origin && !!destination && !!date, // Only fetch if origin and destination are present
    });

    // Validation schema
    const validationSchema = Yup.object({
        origin: Yup.string()
            .required("Origin is required")
            .min(2, "Origin must be at least 2 characters")
            .max(50, "Origin must not exceed 50 characters")
            .matches(/^[a-zA-Z\s]*$/, "Origin must only contain letters and spaces"),
        destination: Yup.string()
            .required("Destination is required")
            .min(2, "Destination must be at least 2 characters")
            .max(50, "Destination must not exceed 50 characters")
            .matches(/^[a-zA-Z\s]*$/, "Destination must only contain letters and spaces"),
        date: Yup.date()
            .required("Date is required")
            .min(flightDateConfig?.minDate, "Date cannot be in the past")
            .max(flightDateConfig?.maxDate, "Date cannot be beyond 10 days from today"),
    });

    const initialValues = {
        origin,
        destination,
        date,
    };

    const onSubmit = async (data) => {
        // Update the URL with the search parameters
        setSearchParams({
            origin: data.origin.toUpperCase(),
            destination: data.destination.toUpperCase(),
            date: data.date,
        });
    };

    const onSuccess = () => {
        return;
    };

    const { formik, mutation } = useFormWithMutation({
        initialValues,
        validationSchema,
        onSubmit,
        onSuccess,
    });

    // Sorting function based on selected criteria
    const sortFlights = (flights, option) => {
        switch (option) {
            case "price":
                return flights?.sort((a, b) => a.price - b.price);
            case "duration":
                // Convert duration to minutes for sorting (e.g., "4h 30m" to 270 minutes)
                return flights?.sort((a, b) => {
                    const getDurationInMinutes = (duration) => {
                        const [hours, minutes] = duration.split("h").map((part) => parseInt(part.trim()));
                        return hours * 60 + minutes;
                    };
                    return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
                });
            case "airline":
                return flights?.sort((a, b) => a.airline.localeCompare(b.airline));
            case "availableSeats":
                return flights?.sort((a, b) => a.availableSeats - b.availableSeats);
            default:
                return flights;
        }
    };

    const sortedFlights = sortFlights(flights, sortOption);

    return (
        <div className="bg-gray-200">
            {/* Search form */}
            <div className="sticky top-16 z-20 bg-white p-2 rounded-lg shadow-lg">
                <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto">
                    <div className="flex gap-4">
                        <InputWrapper label="Origin" error={formik.errors?.origin} touched={formik.touched?.origin}>
                            <input
                                name="origin"
                                placeholder="Origin"
                                value={formik.values?.origin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            />
                        </InputWrapper>

                        <InputWrapper label="Destination" error={formik.errors?.destination} touched={formik.touched?.destination}>
                            <input
                                name="destination"
                                placeholder="Destination"
                                value={formik.values?.destination}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            />
                        </InputWrapper>

                        <InputWrapper label="Date" error={formik.errors?.date} touched={formik.touched?.date}>
                            <input
                                name="date"
                                type="date"
                                value={formik.values?.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min={flightDateConfig?.minDate}
                                max={flightDateConfig?.maxDate}
                                className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            />
                        </InputWrapper>
                    </div>

                    <div className="flex items-end justify-end">
                        <Submit
                            disabled={mutation.isPending}
                            label={mutation.isPending ? "Searching..." : "Search"}
                            icon={mutation.isPending ? <Spinner size="4" /> : <RiSearchLine />}
                            className="w-fit"
                        />
                    </div>
                </form>
            </div>

            {/* Sorting buttons */}
            <div className="p-4 flex items-center bg-white gap-2 text-xs">
                Sort: 
                <button
                    onClick={() => setSortOption("price")}
                    className={`flex items-center px-2 py-1 border rounded-lg ${
                        sortOption === "price" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                >
                    <RiPriceTag3Fill className="mr-2" />
                    Price
                </button>
                <button
                    onClick={() => setSortOption("duration")}
                    className={`flex items-center px-2 py-1 border rounded-lg ${
                        sortOption === "duration" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                >
                    <RiTimeFill className="mr-2" />
                    Duration
                </button>
                <button
                    onClick={() => setSortOption("airline")}
                    className={`flex items-center px-2 py-1 border rounded-lg ${
                        sortOption === "airline" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                >
                    <RiPlaneFill className="mr-2" />
                    Airline
                </button>
                <button
                    onClick={() => setSortOption("availableSeats")}
                    className={`flex items-center px-2 py-1 border rounded-lg ${
                        sortOption === "availableSeats" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                >
                    <MdOutlineAirlineSeatReclineNormal className="mr-2" />
                    Available Seats
                </button>
            </div>

            {/* Flight results */}
            <div className="max-w-7xl mx-auto min-h-screen">
                <div className="m-4 grid gap-4">
                    {flightsLoading ? (
                        <div>Loading flights...</div>
                    ) : sortedFlights?.length > 0 ? (
                        sortedFlights.map((flight, index) => (
                            <FlightBookingCard key={index} flight={flight} />
                        ))
                    ) : (
                        <div>No flights found for your search criteria.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
