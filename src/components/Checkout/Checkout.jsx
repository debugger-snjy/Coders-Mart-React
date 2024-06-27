import React, { useContext, useEffect, useMemo, useState } from 'react'
import payByCash from "../../assets/payment-cash-method.png"
import payByCheque from "../../assets/payment-cheque-method.png"
import OrderItem from '../Cart/OrderItem'
import { cartContext } from '../../context/cartContext'
import { LocateFixed, MapPin, MapPinned, PackageCheck } from 'lucide-react'
import { isAnyFieldEmpty } from "../../utils/validations";
import toast from 'react-hot-toast'
import { placeOrderAPI } from "../../api/order.service.js"
import { getCartItems } from '../../api/cart.service'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../../utils/tokenOperations.js'

function Checkout() {

    // Getting the card context. 
    const { state, dispatch } = useContext(cartContext)
    console.log(state)
    const navigateTo = useNavigate();

    useEffect(() => {

        if (!isUserLoggedIn()) {
            localStorage.setItem("toastError", "Kindly Login to Checkout");
            navigateTo("/login")
            return
        }

        let outOfStockItems = cartItems.filter((item) => item.productInStock === 0)

        if (outOfStockItems.length > 0) {
            localStorage.setItem("toastError", "Sorry, Can't Checkout As Item in Your Cart is Out Of Stock !!")
            navigateTo("/cart")
            return
        }

        if (state === null || !state) {
            navigateTo("/")
        }

    }, [])


    const [userAddress, setUserAddress] = useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).address : "")

    const placeOrder = async () => {
        const paymentMethodByCheque = document.getElementById("radio_1").checked;
        const paymentMethodByCash = document.getElementById("radio_2").checked;
        const address = document.getElementById("address").value;
        let paymentMethod = "";

        if (paymentMethodByCheque) {
            paymentMethod = "CHEQUE"
        }
        if (paymentMethodByCash) {
            paymentMethod = "CASH"
        }
        console.log(address)

        const allFieldValidation = isAnyFieldEmpty({ paymentMethod, address });

        if (allFieldValidation.isEmpty) {
            toast.error(allFieldValidation.message)
        }

        const addOrderResponse = await placeOrderAPI(paymentMethod, address);


        if (addOrderResponse.success) {

            toast.success(addOrderResponse.message)

            localStorage.removeItem("allcartItems");

            try {
                const allItemsInCartResponse = await getCartItems();

                console.log(allItemsInCartResponse.data)

                let allCartItems = {
                    user: JSON.parse(localStorage.getItem("user")),
                    cartItems: [],
                    totalCartItems: 0
                };

                if (allItemsInCartResponse.data.userCart.length > 0) {
                    console.log("Cart Updated !!!");
                    allCartItems = {
                        user: JSON.parse(localStorage.getItem("user")),
                        totalCartItems: allItemsInCartResponse.data.userCart.length === 0 ? 0 : allItemsInCartResponse.data.userCart[0].cartItems.reduce((prev, current) => prev + current.quantity, 0),
                        cartItems: allItemsInCartResponse.data.userCart.length === 0 ? [] : allItemsInCartResponse.data.userCart[0].cartItems.map((item) => {
                            return {
                                _id: item.itemID,
                                productName: item.itemName,
                                productPrice: item.itemPrice,
                                productDescription: item.itemDescription,
                                productImage: item.itemImage,
                                productQuantity: item.quantity,
                            }
                        })
                    }
                }

                localStorage.setItem("allcartItems", JSON.stringify(allCartItems))

                // Updating the State
                dispatch({ type: "UPDATE_STATE" })

                navigateTo("/")
            } catch (error) {
                console.log("[src/components/Checkout/Checkout.jsx] Error : ", error.message)
            }

        }
        else {
            toast.error(addOrderResponse.message)
        }

    }

    // to get data from state
    let { cartItems, totalCartItems } = state;

    // Calculating the Total Bill using Memo Hook
    const totalBill = useMemo(() => {
        const amount = cartItems.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);
        return Math.round(amount * 1000) / 1000
    }, [cartItems]);
    
    if (isUserLoggedIn()) {
        return (
        <>
                <div className="grid sm:space-x-0 md:space-x-0  lg:space-x-5 xl:space-x-10  sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-10 dark:bg-[#252d37] dark:text-white lg:h-screen xl:h-screen" style={cartItems.length > 3 ? { height: "100vh" } : {}}>
                    <div className="px-2">
                        <p className="text-black dark:text-white text-xl font-medium">Order Summary</p>
                        <p className="text-gray-400 dark:text-gray-300">Check your items. And select a suitable shipping method.</p>
                        <div className="space-y-3 rounded-lg py-4">
                            <ul role="list" className="">
                                {state.cartItems.map((product) => (
                                    <React.Fragment className="">
                                        <OrderItem product={product} key={product.itemID} />
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>

                        <p className="mt-8 text-lg font-medium">Payment Methods</p>
                        <form className="mt-5 grid gap-6">
                            <div className="relative">
                                <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                <span className="peer-checked:border-gray-700 dark:peer-checked:border-gray-200 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-600 "></span>
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-gray-200 peer-checked:bg-gray-50 dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-600 p-4" htmlFor="radio_1">
                                    <img src={payByCheque} style={{ filter: "invert(1)" }} width={"25px"} />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Pay By Cheque On Delivery</span>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
                                <span className="peer-checked:border-gray-700 dark:peer-checked:border-gray-200 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 dark:border-gray-600 "></span>
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 dark:peer-checked:border-gray-200 peer-checked:bg-gray-50 dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 dark:border-gray-600 p-4" htmlFor="radio_2">
                                    <img src={payByCash} style={{ filter: "invert(1)" }} width={"25px"} />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Pay By Cash On Delivery</span>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="h-fit sm:mt-10 md:mt-10 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg shadow-gray-900 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium">Payment Details</p>
                        <p className="text-gray-400 dark:text-gray-300">Complete your order by providing your details.</p>
                        <div className="">

                            <label htmlFor="billing-address" className="mt-4 mb-2 block text-md font-medium"> <MapPin className='inline-block' /> Billing Address <span className="text-red-700">*</span></label>
                            <textarea id="address" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Your Address Here" value={userAddress} onChange={(e) => setUserAddress(e.target.value)}></textarea>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-md font-medium text-gray-900 dark:text-white">Subtotal</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">₹ {totalBill}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-md font-medium text-gray-900 dark:text-white">Shipping</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">₹ 1000</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">Total</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">₹ {totalBill + 1000}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <button onClick={() => placeOrder()} className="mt-4 mb-8 w-3/4 rounded-md bg-black dark:bg-white dark:text-black px-6 py-3 font-extrabold text-white hover:bg-gray-700 dark:hover:bg-gray-200">
                                <PackageCheck className='inline mr-2' height={30} width={30} />
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

}

export default Checkout