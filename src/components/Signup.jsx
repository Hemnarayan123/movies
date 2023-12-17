import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../firebase/firebase";

const auth = getAuth(app);

function Signup() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",  // Fixed ID
        {
          size: "invisible",
          callback: (response) => {
            onSignInSubmit();
          },
        },
        auth
      );
    } catch (error) {
      console.error("Error creating RecaptchaVerifier:", error);
    }
  };

  const RequestOtp = () => {
    setLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    if (appVerifier) {
      signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;

          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });

          setOtpSent(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error signing in with phone number:", error);
          setLoading(false);
        });
    } else {
      console.error("RecaptchaVerifier is not initialized");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-10 justify-center items-center">
      <h1 className="text-xl font-bold">Sign up</h1>
      {otpSent ? (
        <>
          <div className="p-2 w-full md:w-1/2">
            <div className="relative">
              <label htmlFor="otp" className="leading-7 text-lg text-white">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full md:w-1/2">
            <button className="flex mx-auto font-bold text-black bg-red-300 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-lg text-white">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="mobile" className="leading-7 text-lg text-white">
                Mobile No.
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full md:w-1/3">
            <div className="relative">
              <label htmlFor="password" className="leading-7 text-lg text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-red-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full">
            <button
              onClick={RequestOtp}
              className="flex mx-auto font-bold text-black bg-red-300 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
            </button>
          </div>
        </>
      )}

      <div>
        <p>
          Already have an account{" "}
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>{" "}
        </p>
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Signup;
