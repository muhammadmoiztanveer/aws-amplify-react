import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";

const RegistrationVerification = ({ onVerify }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits.")
      .required("OTP is required."),
  });

  const handleSubmit = async (values) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await confirmSignUp({
        username: username,
        confirmationCode: values.otp,
      });

      alert("Verification successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrors({ otp: "Invalid OTP or verification failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Verify Your Registration</h1>
        <p className="text-sm text-gray-600 mb-6">
          Please enter the 6-digit OTP sent to your email or phone.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700 mb-2">
                  OTP
                </label>
                <Field
                  type="text"
                  name="otp"
                  id="otp"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationVerification;
