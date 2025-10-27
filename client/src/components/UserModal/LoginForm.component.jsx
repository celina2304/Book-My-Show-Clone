import { DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { backendApi } from "../../config/Axios.config";
import { UserContext } from "../../context/user.context";
import { toast } from "react-toastify";

const LoginForm = ({ setIsSignupOpen, setIsLogin }) => {
  const { setUser } = useContext(UserContext);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoginError({ emailErr: "", passwordErr: "" });
    e.preventDefault();

    try {
      const response = await backendApi.post("/auth/login", {
        email: loginFormData.email,
        password: loginFormData.password,
      });
      console.log(response.data.message);
      console.log(response.data.message === "User does not exist");
      if (response.data.message === "User logged in successfully") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success(response.data.message);
      }
      setIsSignupOpen(false);
      console.log("Login successful:", response.data);
    } catch (error) {
      if (error.response?.data?.message === "User does not exist") {
        setLoginError((prevData) => ({
          ...prevData,
          emailErr: "User does not exist",
        }));
      } else if (error.response?.data?.message === "Invalid password") {
        setLoginError((prevData) => ({
          ...prevData,
          passwordErr: "Invalid password",
        }));
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <>
      <DialogTitle
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Login
      </DialogTitle>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Please fill out the details below to login.
        </p>
      </div>

      <div className="w-full mt-4">
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginFormData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="emelia_erickson24"
              required
            />
            {loginError.emailErr && (
              <p className="text-red-500">{loginError.emailErr}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginFormData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
            {loginError.passwordErr && (
              <p className="text-red-500">{loginError.passwordErr}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 ">
            Don&apos;t have an account?{" "}
            <span
              className="font-medium text-red-700 hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Sign up here
            </span>
          </p>
          <p className="text-sm font-light text-gray-500 ">
            <span
              className="font-medium text-red-700 hover:underline"
              onClick={() => {}}
            >
              Forgot password?
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  setIsSignupOpen: PropTypes.func,
  setIsLogin: PropTypes.func,
};

export default LoginForm;
