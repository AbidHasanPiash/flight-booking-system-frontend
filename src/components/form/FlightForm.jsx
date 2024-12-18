import React from 'react'
import * as Yup from "yup";
import { useFormWithMutation } from '../../utils/useFormWithMutation';
import Submit from '../buttons/Submit';
import Spinner from '../common/Spinner';
import { RiSendPlaneLine } from 'react-icons/ri';
import InputWrapper from '../common/InputWrapper';
import { postData, updateData } from '../../utils/axios';
import apiConfig from '../../configs/apiConfig';
import { useQueryClient } from '@tanstack/react-query';
import flightDateConfig from '../../configs/flightDateConfig';

export default function FlightForm({ flight }) {
    const queryClient = useQueryClient();

    // Ensure minDate and maxDate are correctly set
    const minDate = flightDateConfig?.minDate || new Date().toISOString().slice(0, 16);
    const maxDate = flightDateConfig?.maxDate || new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().slice(0, 16); 

    const validationSchema = Yup.object({
        airline: Yup.string().required("Airline name is required"),
        origin: Yup.string().required("Origin is required"),
        destination: Yup.string().required("Destination is required"),
        departureDate: Yup.date()
            .required("Departure date is required")
            .min(minDate, "Date cannot be in the past")
            .max(maxDate, "Date cannot be beyond 10 days from today"),
        price: Yup.number().positive("Price must be positive").required("Price is required"),
        availableSeats: Yup.number()
            .integer("Seats must be a whole number")
            .positive("Seats must be positive")
            .required("Available seats are required"),
        duration: Yup.string().required("Duration is required"),
    });

    const initialValues = {
        airline: flight?.airline || "",
        origin: flight?.origin || "",
        destination: flight?.destination || "",
        departureDate: flight?.departureDate ? new Date(flight.departureDate).toISOString().slice(0, 16) : "", // Format date
        price: flight?.price || "",
        availableSeats: flight?.availableSeats || "",
        duration: flight?.duration || "",
    };

    const onSubmit = async (data) => {
        // Make the origin and destination uppercase before submitting
        const updatedData = {
            ...data,
            origin: data?.origin.toUpperCase(),
            destination: data?.destination.toUpperCase(),
        };

        if (flight) {
            await updateData(apiConfig.UPDATE_FLIGHT + flight?._id, updatedData);
        } else {
            await postData(apiConfig.CREATE_FLIGHT, updatedData);
        }
        queryClient.invalidateQueries(['flights']);
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
        <form onSubmit={formik.handleSubmit} className='mb-6'>
            <div className="grid grid-cols-3 gap-4">
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
                <InputWrapper label="Origin" error={formik.errors?.origin} touched={formik.touched?.origin}>
                    <input
                        name="origin"
                        placeholder="Origin"
                        value={formik.values?.origin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </InputWrapper>
                <InputWrapper label="Destination" error={formik.errors?.destination} touched={formik.touched?.destination}>
                    <input
                        name="destination"
                        placeholder="Destination"
                        value={formik.values?.destination}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </InputWrapper>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <InputWrapper label="Departure Date" error={formik.errors?.departureDate} touched={formik.touched?.departureDate}>
                    <input
                        name="departureDate"
                        type="datetime-local"
                        min={minDate}
                        max={maxDate}
                        value={formik.values?.departureDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </InputWrapper>
                <InputWrapper label="Price" error={formik.errors?.price} touched={formik.touched?.price}>
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formik.values?.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </InputWrapper>
                <InputWrapper label="Available Seats" error={formik.errors?.availableSeats} touched={formik.touched?.availableSeats}>
                    <input
                        name="availableSeats"
                        type="number"
                        placeholder="Available Seats"
                        value={formik.values?.availableSeats}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </InputWrapper>
                <InputWrapper label="Duration" error={formik.errors?.duration} touched={formik.touched?.duration}>
                    <input
                        name="duration"
                        placeholder="Duration (e.g., 5h 30m)"
                        value={formik.values?.duration}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </InputWrapper>
            </div>
            <div className="flex items-center justify-end mt-4">
                <Submit
                    disabled={mutation.isPending}
                    label={mutation.isPending ? "Processing..." : "Submit"}
                    icon={mutation.isPending ? <Spinner size="4" /> : <RiSendPlaneLine />}
                />
            </div>
        </form>
    )
}
