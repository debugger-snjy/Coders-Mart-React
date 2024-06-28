import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { isAnyFieldEmpty, isEmailValid, isValidName, isValidPassword, isValidPhoneNumber } from "../../utils/validations"
import { createNewUserAPI } from "../../api/user.service"
import { isUserLoggedIn } from "../../utils/tokenOperations.js"
function Signup() {

    const navigateTo = useNavigate();
    const [passwordInvalid, setPasswordInvalid] = useState(null)
    const [nameInvalid, setNameInvalid] = useState(null)
    const [emailInvalid, setEmailInvalid] = useState(null)
    const [phoneInvalid, setPhoneInvalid] = useState(null)
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        if (isUserLoggedIn()) {
            toast('You Are Already Logged In !!')
            navigateTo("/");
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
        if (e.target.name === "password") {
            if (!isValidPassword(e.target.value)) {
                setPasswordInvalid(true);
            }
            else {
                setPasswordInvalid(false)
                console.log("Deon")
            }
        }
        if (e.target.name === "name") {
            if (!isValidName(e.target.value)) {
                setNameInvalid(true);
            }
            else {
                setNameInvalid(false)
                console.log("Deon")
            }
        }
        if (e.target.name === "email") {
            if (!isEmailValid(e.target.value)) {
                setEmailInvalid(true);
            }
            else {
                setEmailInvalid(false)
                console.log("Deon")
            }
        }
        if (e.target.name === "phone") {
            if (!isValidPhoneNumber(e.target.value)) {
                setPhoneInvalid(true);
            }
            else {
                setPhoneInvalid(false)
                console.log("Deon")
            }
        }
    }

    const signUpUser = async () => {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let password = document.getElementById('password').value;
        let isGenderMale = document.getElementById('male').checked;
        let isGenderFemale = document.getElementById('female').checked;
        let isGenderOthers = document.getElementById('others').checked;
        let gender = "";
        if (isGenderMale) {
            gender = "male"
        };
        if (isGenderFemale) {
            gender = "female"
        };
        if (isGenderOthers) {
            gender = "others"
        };

        let address = document.getElementById('address').value;

        console.log(gender)

        let emptyFieldValidations = isAnyFieldEmpty({ name, email, phone, password, gender });

        if (emptyFieldValidations.isEmpty) {

            let responseMessage = emptyFieldValidations.message.toLowerCase();

            if (responseMessage.includes("name") && responseMessage.includes("email") && responseMessage.includes("phone") && responseMessage.includes("gender") && responseMessage.includes("password")) {
                return toast.error("All Form Fields are Empty")
            }
            else {
                return toast.error(emptyFieldValidations?.message || "Invalid Form Data")
            }

        }
        if (!isEmailValid(email)) {
            return toast.error("Invalid Email Address")
        }
        if (!isValidPhoneNumber(phone)) {
            return toast.error("Invalid Phone Number")
        }
        if (!isValidPassword(password)) {
            return toast.error("Invalid Password")
        }
        if (!isValidName(name)) {
            return toast.error("Invalid Name")
        }

        const finalUserData = {
            name,
            email,
            password,
            phone,
            gender,
            address
        }

        // Calling the API Call From the Service
        const apiResponse = await createNewUserAPI(finalUserData);

        console.log(apiResponse)

        if (!apiResponse || !apiResponse?.success) {
            toast.error(apiResponse.message)
        }
        else {
            toast.success(apiResponse.message)
            document.getElementById("resgistrationForm").reset();
            setPasswordInvalid(null);
            setNameInvalid(null);
            setEmailInvalid(null);
            setPhoneInvalid(null);
            navigateTo("/login")
        }
    }

    return (
        <div className="bg-white dark:bg-[#252d37] py-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form id='resgistrationForm' className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span className="text-red-700">*</span></label>
                                <input type="text" onInput={(e) => checkInputs(e)} name="name" id="name" className={`bg-gray-50 border ${nameInvalid === true ? 'border-[3px] dark:border-red-300 border-red-500' : nameInvalid === false ? 'border-[3px] dark:border-green-400 border-green-500 ' : ''} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `} placeholder="Your Full name" required />
                                {nameInvalid === true && <p id="helper-text-explanation" class="mt-2 text-sm text-red-800 dark:text-red-400">Invalid Name</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email <span className="text-red-700">*</span></label>
                                <input type="email" onInput={(e) => checkInputs(e)} name="email" id="email" className={`bg-gray-50 border ${emailInvalid === true ? 'border-[3px] dark:border-red-300 border-red-500' : emailInvalid === false ? 'border-[3px] dark:border-green-400 border-green-500 ' : ''} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `} placeholder="Your Email Address" required />
                                {emailInvalid === true && <p id="helper-text-explanation" class="mt-2 text-sm text-red-800 dark:text-red-400">Invalid Email Address</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone <span className="text-red-700">*</span></label>
                                <input type="tel" onInput={(e) => checkInputs(e)} name="phone" id="phone" className={`bg-gray-50 border ${phoneInvalid === true ? 'border-[3px] dark:border-red-300 border-red-500' : phoneInvalid === false ? 'border-[3px] dark:border-green-400 border-green-500 ' : ''} border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `} placeholder="Your Phone Number" required />
                                {phoneInvalid === true && <p id="helper-text-explanation" class="mt-2 text-sm text-red-800 dark:text-red-400">Invalid Phone Number</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className="text-red-700">*</span></label>
                                <div className="relative">
                                    <input type="password" onInput={(e) => checkInputs(e)} id="password" name="password" className={`bg-gray-50 border border-gray-300 ${passwordInvalid === true ? 'border-[3px] dark:border-red-300 border-red-500' : passwordInvalid === false ? 'border-[3px] dark:border-green-400 border-green-500 ' : ''} text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `} placeholder="Your Password" autocomplete="off" />
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
                                {passwordInvalid === true && <p id="helper-text-explanation" class="mt-2 text-sm text-red-800 dark:text-red-400">Password Must Contain atleast 8 Characters and atleast 1 Upper, 1 Lower, 1 Special and 1 Number in Your Password</p>}
                            </div>
                            <div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender <span className="text-red-700">*</span></label>
                                <div className="flex flex-row space-x-4">
                                    <div>
                                        <input type="radio" name="gender" id="male" /> <span className='text-black dark:text-white'>Male</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="female" /> <span className='text-black dark:text-white'>Female</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="others" /> <span className='text-black dark:text-white'>Others</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <textarea type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Your address" required />
                            </div>
                            <button type="button" onClick={signUpUser} className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign Up</button>
                            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup