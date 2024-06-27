import React, { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { loginUserAPI } from "../../api/user.service.js"
import { isAnyFieldEmpty, isEmailValid } from "../../utils/validations.js"
import toast from 'react-hot-toast'
import { isUserLoggedIn } from "../../utils/tokenOperations.js"
import { cartContext } from '../../context/cartContext.jsx'
import { useDispatch } from 'react-redux'

function Login() {

    const { dispatch } = useContext(cartContext)
    const [emailInvalid, setEmailInvalid] = useState(null)
    const [showPassword, setShowPassword] = useState(true);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn()) {
            toast('You Are Already Logged In !!')
            navigateTo("/");
        }
        if (localStorage.getItem("toastError")) {
            toast.error(localStorage.getItem("toastError"))
            localStorage.removeItem("toastError")
        }
    })

    const togglePassword = (e) => {
        setShowPassword(!showPassword);
        const passwordInput = document.getElementById("password");
        console.log(passwordInput)
        if (showPassword) {
            passwordInput.type = "text"
        }
        else {
            passwordInput.type = "password"
        }
    }

    const checkInputs = (e) => {
        console.log(e)
        if (e.target.name === "email") {
            if (!isEmailValid(e.target.value)) {
                setEmailInvalid(true);
            }
            else {
                setEmailInvalid(false)
                console.log("Deon")
            }
        }
    }

    const loginUser = async () => {

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let emptyFieldValidations = isAnyFieldEmpty({ email, password });

        if (emptyFieldValidations.isEmpty) {
            return toast.error(emptyFieldValidations.message)
        }
        if (!isEmailValid(email)) {
            return toast.error("Invalid Email Address")
        }

        const finalUserLoginData = {
            email,
            password,
        }

        // Calling the API Call From the Service
        const apiResponse = await loginUserAPI(finalUserLoginData);

        if (!apiResponse || !apiResponse?.success) {
            return toast.error(apiResponse?.message ?? "User Not Found")
        }
        else {
            toast.success(apiResponse.message)

            // Updating the State
            dispatch({ type: "UPDATE_STATE" })

            // Navigating the User
            navigateTo("/")
        }
    }

    return (
        <div className="bg-white dark:bg-[#252d37] py-10" style={{ height: "90vh" }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login into Your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span className="text-red-700">*</span></label>
                                <input type="email" onInput={(e) => checkInputs(e)} name="email" id="email" className={`bg-gray-50 border ${emailInvalid === true ? 'border-[3px] dark:border-red-300 border-red-500' : emailInvalid === false ? 'border-[3px] dark:border-green-400 border-green-500 ' : ''} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `} placeholder="Your Email Address" required />
                                {emailInvalid === true && <p id="helper-text-explanation" class="mt-2 text-sm text-red-800 dark:text-red-400">Invalid Email Address</p>}
                            </div>
                            <div class="relative text-gray-600 focus-within:text-gray-400">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className="text-red-700">*</span></label>
                                <div className="relative">
                                    <input type="password" id="password" name="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `} placeholder="Your Password" autocomplete="off" />
                                    <span class="absolute inset-y-0 right-4 flex items-center pl-2">
                                        <button type="button" class="p-1 text-gray-400" onClick={(e) => togglePassword(e)}>
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                            )}
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <button type="button" onClick={loginUser} className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login User</button>
                            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                Don't Have an account? <Link to={"/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login