import React, { useContext } from 'react'
import payByCash from "../../assets/payment-cash-method.png"
import payByCheque from "../../assets/payment-cheque-method.png"
import OrderItem from '../Cart/OrderItem'
import { cartContext } from '../../context/cartContext'
import { LocateFixed, MapPin, MapPinned, PackageCheck } from 'lucide-react'

function Checkout() {

    // Getting the card context. 
    const { state } = useContext(cartContext)

    return (
        <>
            <div className="grid space-x-3 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-10 dark:bg-[#252d37] dark:text-white">
                <div className="px-4 pt-8">
                    <p className="text-black dark:text-white text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400 dark:text-gray-300">Check your items. And select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        <ul role="list" className="">
                            {state.cartItems.map((product) => (
                                <OrderItem product={product} key={product.productID} />
                            ))}
                        </ul>
                    </div>

                    <p className="mt-8 text-lg font-medium">Payment Methods</p>
                    <form className="mt-5 grid gap-6">
                        <div className="relative">
                            <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                            <span className="peer-checked:border-gray-700 dark:peer-checked:border-gray-200 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-600 "></span>
                            <label className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-gray-200 peer-checked:bg-gray-50 dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-600 p-4" htmlhtmlFor="radio_1">
                                <img src={payByCheque} style={{ filter: "invert(1)" }} width={"25px"} />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Pay By Cheque On Delivery</span>
                                </div>
                            </label>
                        </div>
                        <div className="relative">
                            <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
                            <span className="peer-checked:border-gray-700 dark:peer-checked:border-gray-200 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-600 "></span>
                            <label className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-gray-200 peer-checked:bg-gray-50 dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-600 p-4" htmlhtmlFor="radio_2">
                                <img src={payByCash} style={{ filter: "invert(1)" }} width={"25px"} />
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Pay By Cash On Delivery</span>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg shadow-gray-900 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400 dark:text-gray-300">Complete your order by providing your details.</p>
                    <div className="">

                        <label htmlhtmlFor="billing-address" className="mt-4 mb-2 block text-md font-medium"> <MapPin className='inline-block' /> Billing Address</label>
                        <textarea id="address" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Your Address Here"></textarea>
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Subtotal</p>
                                <p className="font-semibold text-gray-900 dark:text-white">$399.00</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Shipping</p>
                                <p className="font-semibold text-gray-900 dark:text-white">$8.00</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Total</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">$408.00</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="mt-4 mb-8 w-3/4 rounded-md bg-black dark:bg-white dark:text-black px-6 py-3 font-extrabold text-white hover:bg-gray-700 dark:hover:bg-gray-200">
                            <PackageCheck className='inline mr-2' height={30} width={30} />
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout