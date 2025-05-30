// useAddUserFormik.ts
import { useFormik } from "formik";
import * as Yup from "yup";

export const useAddUserFormik = (onSubmit: (values: any) => Promise<void>) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must contain only digits")
        .min(10, "Phone number is too short")
        .required("Phone number is required"),
    }),
    onSubmit,
  });

  return formik;
};
