import React from "react";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import * as Yup from "yup";
import { RiSearchLine } from "react-icons/ri";
import { FaPlaneDeparture, FaRegCalendarAlt, FaClock, FaChair, FaPlaneArrival } from "react-icons/fa";
import { toast } from "sonner";
import { useFormWithMutation } from "../utils/useFormWithMutation";
import { FaTag } from "react-icons/fa6";

const mockFlights = [
    {
        airline: "Example Airlines djfhdihfjdf",
        origin: "Iran",
        destination: "Los Angeles",
        departureDate: "2024-11-22T00:00:00.000Z",
        price: 299.99,
        availableSeats: 150,
        duration: "5h 30m"
    },
    {
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

    // Calculate current date (tomorrow) and range for date picker
    const currentDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // Tomorrow
    const minDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // Tomorrow (in YYYY-MM-DD format)
    const maxDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // 10 days from today (in YYYY-MM-DD format)

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
            .min(minDate, "Date cannot be in the past")
            .max(maxDate, "Date cannot be beyond 10 days from today"),
    });

    const initialValues = {
        origin: "Iran",
        destination: "Los Angeles",
        date: currentDate,
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
        <div>
            <h2>Available Flights</h2>

            <div className="pt-20 m-4">
                <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto border border-dotted border-blue-500 bg-white p-2 rounded-lg shadow-lg" >

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
                                min={minDate} // Corrected to use string in YYYY-MM-DD format
                                max={maxDate} // Corrected to use string in YYYY-MM-DD format
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
            <div className="py-8 max-w-7xl mx-auto md:px-10">
                <div className="m-4 grid gap-8">
                    {mockFlights.map((flight, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800">{flight.airline}</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mt-4">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <FaPlaneDeparture className="text-blue-500" />
                                        <span>{flight.origin}</span>
                                        <span>→</span>
                                        <FaPlaneArrival className="text-blue-500" />
                                        <span>{flight.destination}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 text-gray-600">
                                        <FaRegCalendarAlt className="text-blue-500" />
                                        <span>{new Date(flight.departureDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 text-gray-600">
                                        <FaClock className="text-blue-500" />
                                        <span>{flight.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 text-gray-600">
                                        <FaChair className="text-blue-500" />
                                        <span>{flight.availableSeats} seats available</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col items-center space-y-4">
                                    <p className="text-lg font-bold text-blue-600">${flight.price.toFixed(2)}</p>
                                    <button className="px-4 py-2 flex items-center space-x-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                        <FaTag />
                                        <span>Book Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}