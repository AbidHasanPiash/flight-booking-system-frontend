import React from 'react'
import * as Yup from "yup";
import { useFormWithMutation } from '../../utils/useFormWithMutation';
import Submit from '../buttons/Submit';
import Spinner from '../common/Spinner';
import { RiSendPlaneLine } from 'react-icons/ri';
import InputWrapper from '../common/InputWrapper';
import { postData } from '../../utils/axios';
import apiConfig from '../../configs/apiConfig';
import { useQueryClient } from '@tanstack/react-query';

export default function FlightForm() {
    const queryClient = useQueryClient();

    const validationSchema = Yup.object({
        airline: Yup.string().required("Airline name is required"),
        origin: Yup.string().required("Origin is required"),
        destination: Yup.string().required("Destination is required"),
        departureDate: Yup.date().required("Departure date is required"),
        price: Yup.number().positive("Price must be positive").required("Price is required"),
        availableSeats: Yup.number()
            .integer("Seats must be a whole number")
            .positive("Seats must be positive")
            .required("Available seats are required"),
        duration: Yup.string().required("Duration is required"),
    });

    const initialValues = {
        airline: "",
        origin: "",
        destination: "",
        departureDate: "",
        price: "",
        availableSeats: "",
        duration: "",
    };

    const onSubmit = async (data) => {
        // toast.info(JSON.stringify(data))
        await postData(apiConfig.CREATE_FLIGHT, data)
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
