import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import LoginForm from "./LoginForm.component";
import SignupForm from "./SignupForm.component";

const UserModal = ({ isSignupOpen, setIsSignupOpen }) => {
  const [isLogin, setIsLogin] = useState(true); // initially login

  return (
    <>
      {/* <Transition show={isSignupOpen}>
      <TransitionChild>
        <div
          className="fixed inset-0 bg-gray-500 z-50 bg-opacity-75 transition-opacity duration-300 data-[closed]:opacity-0"
          onClick={() => setIsSignupOpen(false)}
        />
      </TransitionChild>
      <TransitionChild>
        <Dialog
          open={isSignupOpen}
          onClose={() => {
            setIsSignupOpen(false);
            setIsLogin(true);
          }}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 p-12">
              <div className="scale-100 data-[closed]:scale-0 duration-300 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {isLogin ? "Login" : "Sign up"}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please fill out the details below to{" "}
                    {isLogin ? "Login" : "Sign up"}.
                  </p>
                </div>

                <div className="w-full mt-4">
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                  >
                    {!isLogin && (
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Your full name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          required={!isLogin}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                          placeholder="Emelia Erickson"
                        />
                      </div>
                    )}
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
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="emelia_erickson24"
                        required
                      />
                      {error.emailErr && (
                        <p className="text-red-500">{error.emailErr}</p>
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
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      {isLogin ? "Login" : "Create an account"}
                    </button>
                    {!isLogin ? (
                      <p className="text-sm font-light text-gray-500 ">
                        Already have an account?{" "}
                        <span
                          className="font-medium text-red-700 hover:underline"
                          onClick={toggleMode}
                        >
                          Sign in here
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm font-light text-gray-500 ">
                        Don&apos;t have an account?{" "}
                        <span
                          className="font-medium text-red-700 hover:underline"
                          onClick={toggleMode}
                        >
                          Sign up here
                        </span>
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </TransitionChild>
    </Transition> */}
      <Transition show={isSignupOpen}>
        <TransitionChild>
          <div
            className="fixed inset-0 bg-gray-500 z-50 bg-opacity-75 transition-opacity duration-300 data-[closed]:opacity-0"
            onClick={() => setIsSignupOpen(false)}
          />
        </TransitionChild>
        <TransitionChild>
          <Dialog
            open={isSignupOpen}
            onClose={() => {
              setIsSignupOpen(false);
              setIsLogin(true);
            }}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="max-w-lg space-y-4 p-12">
                <div className="scale-100 data-[closed]:scale-0 duration-300 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                  {isLogin ? (
                    <LoginForm
                      setIsSignupOpen={setIsSignupOpen}
                      setIsLogin={setIsLogin}
                    />
                  ) : (
                    <SignupForm
                      setIsSignupOpen={setIsSignupOpen}
                      setIsLogin={setIsLogin}
                    />
                  )}
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </TransitionChild>
      </Transition>
    </>
  );
};

UserModal.propTypes = {
  isSignupOpen: PropTypes.bool,
  setIsSignupOpen: PropTypes.func,
};

export default UserModal;
