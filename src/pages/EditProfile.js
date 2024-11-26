import React from "react";
import Submit from "../components/buttons/Submit";
import Spinner from "../components/common/Spinner";
import InputWrapper from "../components/common/InputWrapper";
import * as Yup from "yup";
import { RiSendPlaneLine } from "react-icons/ri";
import { useFormWithMutation } from "../utils/useFormWithMutation";
import { updateData } from "../utils/axios";
import apiConfig from "../configs/apiConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const validationSchema = Yup.object({
        username: Yup.string().required("User name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        // password: Yup.string()
        //     .min(8, "Password must be at least 8 characters")
        //     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        //     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        //     .matches(/[0-9]/, "Password must contain at least one digit")
        //     .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        //     .required("Password is required"),
    });

    const initialValues = {
        username: user?.username || "",
        email: user?.email || "",
        // password: "",
    };

    const onSubmit = async (data) => {
        const res = await updateData(apiConfig?.UPDATE_PROFILE, data)
        if (res) {
            const updatedUserData = {
                ...user,
                username: data?.username || user?.username,
                email: data?.email || user?.email,
            }
            login(updatedUserData)
        }
    };

    const onSuccess = () => {
        formik.resetForm();
        navigate("/profile");
    };

    const { formik, mutation } = useFormWithMutation({
        initialValues,
        validationSchema,
        onSubmit,
        onSuccess,
    });
    return (
        <div className="min-h-screen p-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Update your profile</h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4" >

                <InputWrapper label="User Name" error={formik.errors?.username} touched={formik.touched?.username}>
                    <input
                        name="username"
                        placeholder="User Name"
                        value={formik.values?.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                </InputWrapper>

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

                {/* <InputWrapper label="Password" error={formik.errors?.password} touched={formik.touched?.password}>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values?.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                </InputWrapper> */}

                <div className="text-center">
                    <Submit
                        disabled={mutation.isPending || mutation.isSuccess}
                        label={mutation.isPending ? "Submitting..." : "Update"}
                        icon={mutation.isPending ? <Spinner size="4" /> : <RiSendPlaneLine />}
                        className="w-full"
                    />
                </div>
            </form>
        </div>
    )
}
