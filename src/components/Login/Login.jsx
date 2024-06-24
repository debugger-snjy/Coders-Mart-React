import React, { useContext, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { loginUserAPI } from "../../api/user.service.js"
import { isAnyFieldEmpty, isEmailValid } from "../../utils/validations.js"
import toast from 'react-hot-toast'
import { isUserLoggedIn } from "../../utils/tokenOperations.js"
import { cartContext } from '../../context/cartContext.jsx'
import { useDispatch } from 'react-redux'

function Login() {

    const { dispatch } = useContext(cartContext)

    const navigateTo = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn()) {
            toast('You Are Already Logged In !!')
            navigateTo("/");
        }
    })

    const loginUser = async () => {

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let emptyFieldValidations = isAnyFieldEmpty({ email, password });

        if (emptyFieldValidations.isEmpty) {
            toast.error(emptyFieldValidations.message)
        }
        if (!isEmailValid(email)) {
            toast.error("Invalid Email Address")
        }

        const finalUserLoginData = {
            email,
            password,
        }

        // Calling the API Call From the Service
        const apiResponse = await loginUserAPI(finalUserLoginData);

        if (!apiResponse || !apiResponse?.success) {
            toast.error(apiResponse?.message ?? "User Not Found")
        }
        else {
            toast.success(apiResponse.message)

            // Updating the State
            dispatch({ type: "UPDATE_STATE" })

            console.log("Updated State :",state)

            // Navigating the User
            navigateTo("/")
        }
    }

    return (
        <div className="bg-white dark:bg-[#252d37] py-10" style={{ height: "85vh" }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login into Your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span className="text-red-700">*</span></label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className="text-red-700">*</span></label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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