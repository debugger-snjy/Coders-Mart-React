import React, { useContext, useEffect, useState } from 'react'
import { Menu, X, ChevronDown, ChevronRight, ShoppingCart, Sun, Moon } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useTheme from "../../context/themeContext.js"
import { fetchUser } from '../../utils/tokenOperations.js'
import { logoutUserAPI } from "../../api/user.service.js"
import toast from 'react-hot-toast'
import { cartContext } from "../../context/cartContext.jsx"

const menuItems = [
    {
        name: 'Home',
        href: '#',
    },
    {
        name: 'About',
        href: '#',
    },
    {
        name: 'Contact',
        href: '#',
    },
]

function Header() {

    // Getting the Theme Context Using the Custom Hook Created
    const { darkTheme, lightTheme, themeMode } = useTheme();

    // Creating the Toggle Handler Button
    const onThemeToggle = (e) => {

        if (themeMode === "light") {
            // On Calling the Function, this will change the themeMode 
            // due to that the UseEffect in the App.jsx will be called and the class will automatically changed from light to dark
            darkTheme();
        }
        else {
            // On Calling the Function, this will change the themeMode 
            // due to that the UseEffect in the App.jsx will be called and the class will automatically changed from dark to light
            lightTheme();
        }
    }

    const { state } = useContext(cartContext)

    useEffect(() => {

    }, [state])

    const navigateTo = useNavigate();
    const { dispatch } = useContext(cartContext)

    const logoutUser = async () => {

        const logoutResponse = await logoutUserAPI();

        if (logoutResponse.success) {
            dispatch({ type: "LOGOUT" })
            toast.success("You are Logged Out Successfully !!");
            navigateTo("/")
            state.totalCartItems = 0;
        }
    }

    const totalItems = state.totalCartItems
    // const totalItems = JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems"))?.cartItems.length  : 0;
    console.log(totalItems);


    // Define button classes based on themeMode
    const buttonClasses = `relative inline-flex items-center cursor-pointer px-4 py-2 ${themeMode === 'dark' ? '#131921' : 'bg-gray-200'}`;

    return (
        // <div className="w-full px-5 bg-gray-200 dark:bg-[#131921] sticky top-0 z-50">
        // </div >
        <div className="flex items-center justify-between py-2 shadow-md bg-gray-200 dark:bg-[#131921] px-10">
            <Link className="inline-flex items-center space-x-2" to={"/"}>
                <span>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                            fill={themeMode === "dark" ? "white" : "black"}
                        />
                    </svg>
                </span>
                <span className={`font-bold ${themeMode === "dark" ? "text-white" : "text-black"}`}>Coder's Mart</span>
            </Link>


            <div className="ml-1 mt-1 flex grow justify-end items-center">
                <NavLink className={({ isActive }) => isActive ? "text-black dark:text-white mx-2 cursor-pointer font-bold" : "text-black dark:text-white mx-2 cursor-pointer"} to="/">Home</NavLink>
                {JSON.parse(localStorage.getItem("user")) && <NavLink className={({ isActive }) => isActive ? "text-black dark:text-white mx-2 cursor-pointer font-bold" : "text-black dark:text-white mx-2 cursor-pointer"} to="/cart">Cart</NavLink>}
                {JSON.parse(localStorage.getItem("user")) && <NavLink className={({ isActive }) => isActive ? "text-black dark:text-white mx-2 cursor-pointer font-bold" : "text-black dark:text-white mx-2 cursor-pointer"} to="/orders" >Orders</NavLink>}
                {JSON.parse(localStorage.getItem("user")) && <Link className='text-black dark:text-white mx-2 cursor-pointer' onClick={logoutUser}>Signout</Link>}
                {!JSON.parse(localStorage.getItem("user")) && <NavLink className={({ isActive }) => isActive ? "text-black dark:text-white mx-2 cursor-pointer font-bold" : "text-black dark:text-white mx-2 cursor-pointer"} to="/login" >Login</NavLink>}
                {!JSON.parse(localStorage.getItem("user")) && <NavLink className={({ isActive }) => isActive ? "text-black dark:text-white mx-2 cursor-pointer font-bold" : "text-black dark:text-white mx-2 cursor-pointer"} to="/signup" >Signup</NavLink>}

                <div className='mx-0 mr-8 relative'>
                    <div className="relative inline-flex">

                        {/* Theme Switcher */}

                        <button type="button" className={buttonClasses} onClick={onThemeToggle}>
                            <span className="">
                                {themeMode === "dark" ? <Sun width={"24px"} fill='black' color='white' /> : <Moon width={"24px"} />}
                            </span>
                        </button>

                        {/* Cart with Items in Cart */}
                        <Link className='py-2' to={"/cart"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={themeMode === "dark" ? "white" : "black"} className="bi bi-cart-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </Link>
                        <span
                            className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[1%] right-[1%] translate-x-1/4 -translate-y-1/4 bg-red-500 text-white min-w-[20px] min-h-[20px]">
                            {/* {JSON.parse(localStorage.getItem("allcartItems")) ? JSON.parse(localStorage.getItem("allcartItems")).cartItems.length : 0} */}
                            {state.totalCartItems}
                        </span>

                    </div>

                </div>

                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="User dropdown" />

                <div id="userDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).name : "Guest User"}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        {!JSON.parse(localStorage.getItem("user")) &&
                            <>
                                <li>
                                    <Link to={"/login"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
                                </li>
                                <li>
                                    <Link to={"/signup"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign Up</Link>
                                </li>
                            </>
                        }
                        {JSON.parse(localStorage.getItem("user")) &&
                            <>
                                <li>
                                    <Link to={"/cart"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cart</Link>
                                </li>
                            </>
                        }
                    </ul>
                    {JSON.parse(localStorage.getItem("user")) && <div className="py-1">
                        <div onClick={logoutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</div>
                    </div>}
                </div>


            </div>

        </div>
    )


}

export default Header;