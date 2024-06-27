import React, { useContext, useState } from 'react'
import { MinusCircleIcon, PlusCircleIcon, Trash } from 'lucide-react'
import { cartContext } from '../../context/cartContext'
import { removeItemFromCart, updateQuantityInCartItem } from '../../api/cart.service'
import { isUserLoggedIn } from '../../utils/tokenOperations'
import { Link } from 'react-router-dom'

function CartItem({ product }) {

    // Getting the dispatch function to execute action function
    const { dispatch } = useContext(cartContext)
    console.log(product)

    return (
        <div key={product._id} className="relative bg-gray-200 px-5 py-2 mb-5 rounded-lg border-2 border-black hover:shadow-md hover:shadow-black dark:bg-gray-900 dark:border-white dark:hover:bg-gray-800 dark:hover:shadow-white">
            <li className="flex py-2 sm:py-2 items-center">
                        {product.productInStock === 0 ? <span className="ribbon text-sm">OUT OF STOCK</span> : product.productInStock <= 5 ? <span className="ribbon text-sm bg-yellow-200 text-black">FEW REMAINING</span> : ''}
                <div className="flex-shrink-0 ">
                    <Link to={`/product/${product._id}`}>
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            width={"200px"}
                            className="rounded-md object-contain object-center shadow-xl border-4 border-black/60"
                        /></Link>
                </div>

                <div className="ml-4 flex flex-1 flex-row items-center justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 items-center">
                        <div>
                            <div className="flex justify-between">
                                <h3 className="text-lg ">
                                    <Link to={`/product/${product._id}`} className="font-bold text-black dark:text-white">
                                        {product.productName}
                                    </Link>
                                </h3>
                            </div>
                            <div className="mt-1 flex items-end">
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                                    ₹ {product.productPrice}
                                </p>
                            </div>
                            <p className="text-lg font-semibold select-none mt-2">
                                {product.productInStock !== 0 ?
                                    <>
                                        {/* Calling the decrement action function to Reduce item by one */}
                                        {product.productQuantity == 1 ? < MinusCircleIcon size={20} className="text-gray-500 inline mr-1" /> : < MinusCircleIcon size={20} className="text-black dark:text-white inline mr-1" onClick={async () => {
                                            dispatch({ type: "DECREMENT_ITEM_IN_CART", payload: { _id: product._id } })
                                            if (isUserLoggedIn()) {
                                                await updateQuantityInCartItem(product._id, 1, "remove")
                                            }
                                        }} />}
                                        <span className='mx-2 text-bold text-lg'>{product.productQuantity}</span>

                                        {/* Calling the Increment action function to increase item by one */}
                                        {
                                            product.productQuantity >= product.productInStock ? <PlusCircleIcon size={20} className="text-gray-500 inline ml-1" /> : <PlusCircleIcon size={20} className="text-black dark:text-white inline ml-1" onClick={async () => {
                                                dispatch({ type: "INCREMENT_ITEM_IN_CART", payload: { _id: product._id } })
                                                if (isUserLoggedIn()) {
                                                    await updateQuantityInCartItem(product._id, 1, "add")
                                                }
                                            }} />
                                        }
                                    </>
                                    :
                                    <>
                                        {/* Calling the decrement action function to Reduce item by one */}
                                        < MinusCircleIcon size={20} className="text-gray-500 inline mr-1" />

                                        <span className='mx-2 text-bold text-lg'>0</span>

                                        {/* Calling the Increment action function to increase item by one */}
                                        <PlusCircleIcon size={20} className="text-gray-500 inline ml-1" />
                                    </>
                                }
                            </p>

                        </div>
                    </div>
                    <div className="text-lg font-semibold select-none ">

                        {/* Calling the remove item from cart Action function In state */}
                        <button type="button" className="group flex items-center space-x-1 rounded-lg p-2 hover:bg-red-800" onClick={async () => {
                            dispatch({ type: "REMOVE_ITEM_IN_CART", payload: { _id: product._id } })
                            if (isUserLoggedIn()) {
                                await removeItemFromCart(product._id)
                            }
                        }}>
                            <Trash size={20} strokeWidth={"3px"} className="text-red-900 dark:text-red-500 font-bold group-hover:text-red-200" />
                            <span className="text-lg text-red-500 group-hover:text-red-200 font-bold">Remove</span>
                        </button>
                    </div>
                </div>
            </li>
            <div className="mb-2 flex">

            </div>
        </div>
    )
}

export default CartItem
