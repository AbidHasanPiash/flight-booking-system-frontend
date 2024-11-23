import React from "react";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import * as Yup from "yup";
import { RiSearchLine } from "react-icons/ri";
import { toast } from "sonner";
import { useFormWithMutation } from "../utils/useFormWithMutation";
import { useLocation } from "react-router-dom";
import flightDateConfig from "../configs/flightDateConfig";
import FlightBookingCard from "../components/card/FlightBookingCard";

const mockFlights = [
    {
        id: 1,
        airline: "Example Airlines djfhdihfjdf",
        origin: "Iran",
        destination: "Los Angeles",
        departureDate: "2024-11-22T00:00:00.000Z",
        price: 299.99,
        availableSeats: 150,
        duration: "5h 30m"
    },
    {
        id: 2,
        airline: "Sample Airlines",
        origin: "Canada",
        destination: "New York",
        departureDate: "2024-11-25T00:00:00.000Z",
        price: 349.99,
        availableSeats: 120,
        duration: "4h 15m"
    },
    {
        id: 3,
        airline: "Sample Airlines",
        origin: "Canada",
        destination: "New York",
        departureDate: "2024-11-25T00:00:00.000Z",
        price: 349.99,
        availableSeats: 120,
        duration: "4h 15m"
    },
    {
        id: 4,
        airline: "Sample Airlines",
        origin: "Canada",
        destination: "New York",
        departureDate: "2024-11-25T00:00:00.000Z",
        price: 349.99,
        availableSeats: 120,
        duration: "4h 15m"
    },
    // Add more flight data here...
];

export default function SearchResults() {
    const location = useLocation();
  
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const origin = queryParams.get("origin");
    const destination = queryParams.get("destination");
    const date = queryParams.get("date");

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
        origin: origin || "Iran",
        destination: destination || "Los Angeles",
        date: date || flightDateConfig?.currentDate,
    };

    const onSubmit = async (data) => {
        toast.success(JSON.stringify(data));
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
            <div className="sticky top-16 z-20 bg-white p-2 rounded-lg shadow-lg">
                <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto" >

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

            {/* Grid of flights */}
            <div className="max-w-7xl mx-auto">
                <div className="m-4 grid gap-4">
                    {mockFlights.map((flight, index) => (
                        <FlightBookingCard key={index} flight={flight}/>
                    ))}
                </div>
            </div>
        </div>
    )
}