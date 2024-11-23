import React, { useState } from "react";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import { toast } from "sonner";
import * as Yup from "yup";
import { RiSendPlaneLine } from "react-icons/ri";
import { useFormWithMutation } from "../utils/useFormWithMutation";

export default function AdminDashboard() {
    const [flights, setFlights] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [editingFlightId, setEditingFlightId] = useState(null);

    const validationSchema = Yup.object({
        airline: Yup.string().required("Airline name is required"),
        departure: Yup.string().required("Departure location is required"),
        arrival: Yup.string().required("Arrival location is required"),
        date: Yup.date().required("Date is required"),
    });

    const initialValues = {
        airline: "",
        departure: "",
        arrival: "",
        date: "",
    };

    const onSubmit = async (data) => {
        if (editingFlightId) {
            // Update flight
            setFlights((prev) =>
                prev.map((flight) =>
                    flight.id === editingFlightId ? { ...flight, ...data } : flight
                )
            );
            toast.success("Flight updated successfully!");
        } else {
            // Add new flight
            setFlights([...flights, { id: Date.now(), ...data }]);
            toast.success("Flight added successfully!");
        }
        setEditingFlightId(null);
        formik.resetForm();
    };

    const onEditFlight = (flight) => {
        setEditingFlightId(flight.id);
        formik.setValues(flight);
    };

    const onDeleteFlight = (id) => {
        setFlights(flights.filter((flight) => flight.id !== id));
        toast.success("Flight deleted successfully!");
    };

    const fetchBookings = () => {
        setBookings([
            { id: 1, user: "John Doe", flight: "Flight 101", status: "Confirmed" },
            { id: 2, user: "Jane Smith", flight: "Flight 202", status: "Pending" },
        ]);
    };

    const { formik, mutation } = useFormWithMutation({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Flight Management */}
            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Flights</h2>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                    <InputWrapper label="Airline" error={formik.errors?.airline} touched={formik.touched?.airline}>
                        <input
                            name="airline"
                            placeholder="Airline Name"
                            value={formik.values?.airline}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </InputWrapper>
                    <InputWrapper label="Departure" error={formik.errors?.departure} touched={formik.touched?.departure}>
                        <input
                            name="departure"
                            placeholder="Departure Location"
                            value={formik.values?.departure}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </InputWrapper>
                    <InputWrapper label="Arrival" error={formik.errors?.arrival} touched={formik.touched?.arrival}>
                        <input
                            name="arrival"
                            placeholder="Arrival Location"
                            value={formik.values?.arrival}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </InputWrapper>
                    <InputWrapper label="Date" error={formik.errors?.date} touched={formik.touched?.date}>
                        <input
                            name="date"
                            type="date"
                            value={formik.values?.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </InputWrapper>
                    <div className="col-span-2">
                        <Submit
                            disabled={mutation.isPending}
                            label={mutation.isPending ? "Processing..." : editingFlightId ? "Update Flight" : "Add Flight"}
                            icon={mutation.isPending ? <Spinner size="4" /> : <RiSendPlaneLine />}
                            className="w-full"
                        />
                    </div>
                </form>

                {/* Flights Table */}
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border px-4 py-2">Airline</th>
                            <th className="border px-4 py-2">Departure</th>
                            <th className="border px-4 py-2">Arrival</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight.id} className="bg-white hover:bg-gray-50">
                                <td className="border px-4 py-2">{flight.airline}</td>
                                <td className="border px-4 py-2">{flight.departure}</td>
                                <td className="border px-4 py-2">{flight.arrival}</td>
                                <td className="border px-4 py-2">{flight.date}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:underline mr-2"
                                        onClick={() => onEditFlight(flight)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => onDeleteFlight(flight.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Bookings Section */}
            <section className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                    onClick={fetchBookings}
                >
                    View Bookings
                </button>
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border px-4 py-2">User</th>
                            <th className="border px-4 py-2">Flight</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="bg-white hover:bg-gray-50">
                                <td className="border px-4 py-2">{booking.user}</td>
                                <td className="border px-4 py-2">{booking.flight}</td>
                                <td className="border px-4 py-2">{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
