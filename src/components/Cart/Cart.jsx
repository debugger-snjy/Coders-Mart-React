import React, { useContext, useEffect, useMemo, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import CartItem from './CartItem'
import { ChevronDown, ChevronUp } from 'lucide-react';
import useTheme from "../../context/themeContext.js"
import emptyCart from "../../assets/empty-cart.png"
import { Link } from 'react-router-dom';

function Cart() {

    // To view all items and its price. 
    const [isViewAll, setIsViewAll] = useState(false)

    // Getting the card context. 
    const { state } = useContext(cartContext)

    // to get data from state
    const { cartItems, totalCartItems } = state;
    console.log("Cart Items : ", cartItems);

    // Calculating the Total Bill using Memo Hook
    const totalBill = useMemo(() => {
        const amount = cartItems.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);
        return Math.round(amount * 1000) / 1000
    }, [cartItems]);

    const { themeMode } = useTheme()

    // returning the JSX
    return (
        <div className="dark:bg-[#252d37] dark:text-white">
            <div className="mx-auto max-w-7xl px-2 lg:px-0 ">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white"> Shopping Cart
                            </h1>
                        </div>
                        <div>
                            <button type="button" className="px-10 py-3 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200  font-medium rounded-lg text-sm text-center inline-flex items-center me-2 mb-2">
                                <svg className="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={themeMode === "light" ? "white" : "black"} viewBox="0 0 20 20">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="text-lg text-white dark:text-black font-bold" disabled={cartItems.length === 0}>Empty My Cart</span>
                            </button>
                        </div>
                    </div>

                    {/* Checking the cart items length, If length is zero, then showing message that cart is empty   */}
                    {
                        cartItems.length === 0 && <div className='text-1xl font-bold text-center text-red-600 my-14' style={{ height: "60vh" }}>
                            <div className="flex flex-col items-center justify-center">
                                <img src={emptyCart} className='w-1/4' alt="" />
                                <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200 mt-5">Looks Like you have not added anything to your cart. <br />Go Ahead And Enjoy Shopping</p>
                            </div>
                        </div>
                    }
                    {/* Showing the cart items if the length is not 0  */}
                    {
                        cartItems.length > 0 && cartItems && <React.Fragment>
                            <h1 className="text-xl font-bold mt-6 mb-5 text-gray-900 sm:text-1xl dark:text-white">
                                Your Items
                            </h1>
                            <form className="mt-3 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">

                                <section aria-labelledby="cart-heading" className="rounded-lg dark:bg-[#252d37] lg:col-span-8">
                                    <h2 id="cart-heading" className="sr-only">
                                        Items in your shopping cart
                                    </h2>
                                    <ul role="list" className="">
                                        {state.cartItems.map((product) => (
                                            <CartItem product={product} key={product.productID} />
                                        ))}
                                    </ul>
                                </section>
                                {/* Order summary */}
                                <section
                                    aria-labelledby="summary-heading"
                                    className="mt-10 rounded-md dark:bg-black bg-gray-100 border-2 border-black text-black dark:text-white dark:border-white lg:col-span-4 lg:mt-0 lg:p-0"
                                >
                                    <h2
                                        id="summary-heading"
                                        className="border-b-2 border-black dark:border-gray-200 px-4 pt-3 text-2xl text-center font-bold text-black dark:text-white sm:p-4"
                                    >
                                        Price Details
                                    </h2>
                                    <div>
                                        <dl className="space-y-1 px-2 py-4">

                                            {/* To change the arrow upward or downward.  */}
                                            <div className="flex items-center justify-between" data-collapse-target="animated-collapse-1"
                                                onClick={() => setIsViewAll((prevView) => !prevView)}>
                                                <dt className="text-md text-black dark:text-white font-bold">
                                                    Price ({totalCartItems} item)
                                                    {isViewAll ? <ChevronUp size={20} className='inline ' /> : <ChevronDown size={20} className='inline ' />}
                                                </dt>
                                                <dd className="text-md font-bold text-black dark:text-white/90">₹ {totalBill}</dd>
                                            </div>

                                            {/* Showing all the card items if isViewAll is true */}
                                            {
                                                isViewAll &&
                                                <table className='text-sm table w-full dark:bg-gray-300 bg-gray-700 rounded-lg duration-150'>
                                                    <tbody>
                                                        {
                                                            cartItems.map((item) => {
                                                                return (
                                                                    <tr key={item.productID}>
                                                                        <td className='px-5 py-1 text-sm dark:text-black text-white font-semibold'>{item.productName}</td>
                                                                        <td className='px-5 py-1 text-sm dark:text-black text-white font-semibold'>x {item.productQuantity}</td>
                                                                        <td className='px-5 py-1 text-sm dark:text-black text-white font-bold text-right'>₹ {item.productPrice * item.productQuantity}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            }

                                            <div className="flex items-center justify-between pt-4">
                                                <dt className="flex text-md text-black dark:text-white font-bold">
                                                    <span>Discount</span>
                                                </dt>
                                                <dd className="text-md font-bold dark:text-green-400 text-green-900">- ₹ 3,431</dd>
                                            </div>
                                            <div className="flex items-center justify-between py-4">
                                                <dt className="flex text-md text-black dark:text-white font-bold">
                                                    <span>Delivery Charges</span>
                                                </dt>
                                                <dd className="text-md font-bold dark:text-green-400 text-green-900">Free</dd>
                                            </div>
                                            <div className="flex items-center justify-between  border-black dark:border-white border-y-[5px] border-dashed py-4 ">
                                                <dt className="text-base font-black tracking-wide text-black/90 dark:text-white/90">Total Amount</dt>
                                                {/* Showing the total bill after removing the discount */}
                                                <dd className="text-base font-black tracking-wide text-black/90 dark:text-white/90">₹ {Math.round((totalBill - 3431) * 1000) / 1000}</dd>
                                            </div>
                                        </dl>
                                        <div className="px-2 pb-4 font-bold dark:text-green-400 text-green-800">
                                            You will save ₹ 3,431 on this order 🎉
                                        </div>
                                    </div>
                                </section>
                            </form>

                            {/* Adding the Checkout Button */}
                            <div className='text-center'>
                                <Link to={"/checkout"}>
                                    <button type="button" className="px-24 py-4 my-5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200  font-medium rounded-lg text-sm text-center inline-flex items-center me-2 mb-2">
                                        <svg className="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={themeMode === "light" ? "white" : "black"} viewBox="0 0 20 20">
                                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                        </svg>
                                        <span className="text-lg text-white dark:text-black font-bold" disabled={cartItems.length === 0}>Checkout</span>
                                    </button>
                                </Link>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </div >
    )
}

export default Cart
