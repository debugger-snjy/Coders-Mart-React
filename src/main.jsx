import { cartContext, CartProvider } from './context/cartContext.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from "./components/Layout/Layout.jsx"
import Home from './components/Home/Home.jsx'
import Cart from './components/Cart/Cart.jsx'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import { isUserLoggedIn } from './utils/tokenOperations.js'

// Created router and all its path 
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={isUserLoggedIn() ? <Checkout /> : <Login />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    // We have to remove this StrictMode because it will cause the code to run twice
    // <React.StrictMode>
    <CartProvider>
        <RouterProvider router={router} />
        <Toaster
            position="bottom-right"
            toastOptions={
                {

                    style: { backgroundColor: 'black', color: 'white' }
                }
            }
            reverseOrder={true}
        />
    </CartProvider>
    // </React.StrictMode>
)
