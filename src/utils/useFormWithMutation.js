import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

/**
 * Utility to set up formik and react-query mutation
 * @param {Object} options - Configuration options
 * @param {Object} options.initialValues - Initial form values
 * @param {Object} options.validationSchema - Yup validation schema
 * @param {Function} options.onSubmit - Function to handle form submission
 * @param {Function} options.onSuccess - Callback after successful mutation
 * @returns {Object} { formik, mutation } - Formik instance and mutation instance
 */
export const useFormWithMutation = ({
  initialValues,
  validationSchema,
  onSubmit,
  onSuccess,
}) => {
  // Mutation setup
  const mutation = useMutation({
    mutationKey: ["formSubmit"],
    mutationFn: onSubmit,
    onSuccess,
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return { formik, mutation };
};
