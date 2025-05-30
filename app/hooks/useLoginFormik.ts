// useLoginFormik.ts
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/app/context/AuthContext";

export const useLoginFormik = () => {
  const { login } = useAuth();
  const [generalError, setGeneralError] = useState<string>("");

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email not valid")
        .required("email is required"),
      password: Yup.string()
        .min(6, "password must be at least 6 characters")
        .required("password is required"),
    }),
    onSubmit: (values) => {
      setGeneralError("");
      if (values.email === "admin@admin.com" && values.password === "john2004") {
        login();
      } else {
        setGeneralError("Email or password not correct");
      }
    },
  });

  return { formik, generalError };
};
