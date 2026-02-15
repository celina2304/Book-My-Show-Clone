/* eslint-disable no-unused-vars */
import { DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { backendApi } from "../../config/Axios.config";
import { UserContext } from "../../context/user.context";
import { toast } from "react-toastify";

const inputCls =
  "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5";
const labelCls = "block mb-2 text-sm font-medium text-gray-900";

const SignupForm = ({ setIsSignupOpen, setIsLogin }) => {
  const { setUser } = useContext(UserContext);
  const [otp, setOtp] = useState("");
  const [modalStep, setModalStep] = useState("sendOtp");
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });
  const [otpError, setOtpError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // FORM SUBMIT HANDLER BASED ON STEP
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (modalStep === "sendOtp") return handleSendOtp();
    if (modalStep === "verifyOtp") return handleVerifyOtp();
    if (modalStep === "signup") return handleSignup();
  };

  // ALL EXISTING HANDLERS BELOW
  const handleSendOtp = async () => {
    if (!signupFormData.email || !signupFormData.email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const response = await backendApi.post("/auth/send-otp", {
        email: signupFormData.email,
      });
      if (response.data.message === "OTP sent successfully") {
        toast.success(response.data.message);
        setModalStep("verifyOtp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await backendApi.post("/auth/verify-otp", {
        email: signupFormData.email,
        otp,
      });
      if (response.data.message === "OTP verified successfully") {
        toast.success(response.data.message);
        setModalStep("signup");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = signupFormData;
    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await backendApi.post("/auth/signup", {
        name,
        email,
        password,
      });
      if (response.data.message === "User registered successfully") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Signup successful!");
        setIsSignupOpen(false);
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case "sendOtp":
        return <SendOtp signupFormData={signupFormData} handleChange={handleChange} signupError={signupError} />;
      case "verifyOtp":
        return (
          <VerifyOtp
            signupFormData={signupFormData}
            otp={otp}
            setOtp={setOtp}
            otpError={otpError}
            handleResendOtp={handleSendOtp}
          />
        );
      case "signup":
        return <Signup signupFormData={signupFormData} handleChange={handleChange} signupError={signupError} />;
      default:
        return null;
    }
  };

  return (
    <>
      <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
        Signup
      </DialogTitle>

      <div className="w-full mt-4">
        <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
          {renderModalContent()}

          <button
            type="submit"
            className="w-full text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {modalStep === "sendOtp"
              ? "Get OTP"
              : modalStep === "verifyOtp"
              ? "Verify OTP"
              : "Signup"}
          </button>

          <p className="text-sm font-light text-gray-500 ">
            Already have an account?{" "}
            <span className="font-medium text-red-700 hover:underline" onClick={() => setIsLogin(true)}>
              Login here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};


const SendOtp = ({
  signupFormData,
  handleChange,
  handleSendOtp,
  signupError,
}) => {
  return (
    <>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Please enter your email address to continue.
        </p>
      </div>
      <div>
        {/* <label htmlFor="email" className={labelCls}>
          Email
        </label> */}
        <input
          type="email"
          name="email"
          id="email"
          value={signupFormData.email}
          onChange={handleChange}
          className={inputCls}
          placeholder="emelia_erickson24"
          required
        />
        {signupError.emailErr && (
          <p className="text-red-500">{signupError.emailErr}</p>
        )}
      </div>
    </>
  );
};

const VerifyOtp = ({
  signupFormData,
  handleVerifyOtp,
  handleResendOtp,
  otp,
  setOtp,
  otpError,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleResend = (e) => {
    handleResendOtp(e); // Call the resend OTP function
    setTimer(60); // Reset the timer
  };
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6); // Allow only numbers and limit to 6 digits
    setOtp(value);
    // onChange(value); // Notify parent component of OTP value
  };
  return (
    <>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Please enter the otp sent to your email {`(${signupFormData.email})`}{" "}
          to continue.
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        <div className="flex space-x-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              onClick={() => {
                const input = document.getElementById("otp-input");
                input.focus();
                // input.setSelectionRange(index, index + 1);
              }}
              className={`w-12 h-12 flex items-center justify-center border-2 ${
                index < otp.length ? "border-blue-500" : "border-gray-300"
              } rounded-lg text-lg font-bold`}
            >
              {otp[index] ||
                (index === otp.length && isFocused && (
                  <span className="blinking-cursor">|</span>
                ))}
            </div>
          ))}
        </div>
        <input
          type="text"
          id="otp-input"
          value={otp}
          onChange={handleChange}
          className="absolute opacity-0 w-1 h-1"
          autoFocus
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <button
        onClick={handleResend}
        disabled={timer > 0}
        className={`w-full font-medium rounded-lg text-sm px-5 py-1 text-center ${
          timer > 0 ? "text-gray-500 cursor-not-allowed" : "text-red-700"
        }`}
      >
        {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : "Resend OTP"}
      </button>
      <style>
        {`
          .blinking-cursor {
            display: inline-block;
            font-size: 1rem;
            color: #000;
            animation: blink 1s step-start infinite;
          }
          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};

const Signup = ({ signupFormData, handleChange, signupError }) => {
  return (
    <>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Please complete your details to continue.
        </p>
      </div>
      <div>
        <label htmlFor="name" className={labelCls}>
          Your full name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={signupFormData.name}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="Emelia Erickson"
        />
      </div>
      <p>Just One Upper, One Lower, One Number</p>
      <div>
        <label htmlFor="password" className={labelCls}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={signupFormData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={inputCls}
          required
        />
        {signupError.passwordErr && (
          <p className="text-red-500">{signupError.passwordErr}</p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className={labelCls}>
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={signupFormData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          className={inputCls}
          required
        />
        {signupError.passwordErr && (
          <p className="text-red-500">{signupError.passwordErr}</p>
        )}
      </div>
    </>
  );
};

SignupForm.propTypes = {
  setIsSignupOpen: PropTypes.func,
  setIsLogin: PropTypes.func,
};

SendOtp.propTypes = {
  signupFormData: PropTypes.object,
  handleChange: PropTypes.func,
  handleSendOtp: PropTypes.func,
  signupError: PropTypes.object,
};

VerifyOtp.propTypes = {
  signupFormData: PropTypes.object,
  handleVerifyOtp: PropTypes.func,
  handleResendOtp: PropTypes.func,
  signupError: PropTypes.object,
  otp: PropTypes.string,
  setOtp: PropTypes.func,
  otpError: PropTypes.string,
};

Signup.propTypes = {
  signupFormData: PropTypes.object,
  handleChange: PropTypes.func,
  signupError: PropTypes.object,
};

export default SignupForm;
