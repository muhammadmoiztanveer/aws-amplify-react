import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "aws-amplify/auth";

const LoginPage = () => {
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    const { isSignedIn, nextStep } = await signIn({ username: values.email, password: values.password });

    console.log("isSignedIn", isSignedIn, "nextStep", nextStep)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
