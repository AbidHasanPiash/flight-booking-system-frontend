import React from "react";
import { useQuery } from "@tanstack/react-query";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import * as Yup from "yup";
import { RiSearchLine } from "react-icons/ri";
import { useFormWithMutation } from "../utils/useFormWithMutation";
import { useSearchParams } from "react-router-dom";
import flightDateConfig from "../configs/flightDateConfig";
import FlightBookingCard from "../components/card/FlightBookingCard";
import apiConfig from "../configs/apiConfig";
import { fetchData } from "../utils/axios";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

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
            origin: data.origin,
            destination: data.destination,
            date: data.date,
        });
    };

    const onSuccess = () => {
        formik.resetForm();
    };

    const { formik, mutation } = useFormWithMutation({
        initialValues,
        validationSchema,
        onSubmit,
        onSuccess,
    });

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

            {/* Flight results */}
            <div className="max-w-7xl mx-auto">
                <div className="m-4 grid gap-4">
                    {flightsLoading ? (
                        <div>Loading flights...</div>
                    ) : flights?.length > 0 ? (
                        flights.map((flight, index) => (
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
