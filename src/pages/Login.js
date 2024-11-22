import React from "react";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { RiSendPlaneLine } from "react-icons/ri";
import InputWrapper from "../components/common/InputWrapper";

export default function Login() {
    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const initialValues = {
        email: "montasimmamun@gmail.com",
        password: "Qweqwe@12345",
    };

    const submit = async (data) => {
        console.log(data);
    };

    const onSuccess = () => {
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => mutation.mutate(values),
    });

    const mutation = useMutation({
        mutationKey: ["login"],
        mutationFn: submit,
        onSuccess,
    });

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4" >
                    {/* Email Input */}
                    <InputWrapper label="Email" error={formik.errors?.email} touched={formik.touched?.email}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formik.values?.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                    </InputWrapper>

                    {/* Password Input */}
                    <InputWrapper label="Password" error={formik.errors?.password} touched={formik.touched?.password}>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formik.values?.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                    </InputWrapper>

                    {/* Submit Button */}
                    <div className="text-center">
                        <Submit
                            disabled={mutation.isPending || mutation.isSuccess}
                            label={mutation.isPending ? "Submitting..." : "Login"}
                            icon={mutation.isPending ? <Spinner size="4" /> : <RiSendPlaneLine />}
                            className="w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
