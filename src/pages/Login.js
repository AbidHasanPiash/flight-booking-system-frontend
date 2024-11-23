import React from "react";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import * as Yup from "yup";
import { RiSendPlaneLine } from "react-icons/ri";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useFormWithMutation } from "../utils/useFormWithMutation";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
            .required("Password is required"),
    });

    const initialValues = {
        email: "abid@mail.com",
        password: "Password@1234",
    };

    const onSubmit = async (data) => {
        toast.success(JSON.stringify(data));
        const userData = {
            email: "email.mail.com",
            role: "admin", // "user" or "admin"
            name: "John Doe", // Mock name
        };
        login(userData);
        if (userData.role === 'admin') {
            navigate("/admin");
        } else {
            navigate("/profile");
        }
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
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Please enter your credentials to access your account</p>
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4" >

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

                    <div className="text-center">
                        <Submit
                            disabled={mutation.isPending || mutation.isSuccess}
                            label={mutation.isPending ? "Submitting..." : "Login"}
                            icon={mutation.isPending ? <Spinner size="4" /> : <RiSendPlaneLine />}
                            className="w-full"
                        />
                    </div>
                </form>

                <div className="m-8 mx-auto w-full h-px bg-gray-200" />

                <div className="mt-8 space-y-2">
                    <div className="flex space-x-2">
                        <p className="text-sm text-gray-500">Already have account ?</p>
                        <Link to={'/register'} className="text-sm hover:text-blue-500 hover:underline">Register</Link>
                    </div>

                    <div className="flex space-x-2">
                        <p className="text-sm text-gray-500">Back to home ?</p>
                        <Link to={'/'} className="text-sm hover:text-blue-500 hover:underline">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
