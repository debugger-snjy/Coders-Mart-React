import React, { useContext, useState } from 'react'
import { MinusCircleIcon, PlusCircleIcon, Trash } from 'lucide-react'
import { cartContext } from '../../context/cartContext'

function CartItem({ product }) {

    // Getting the dispatch function to execute action function
    const { dispatch } = useContext(cartContext)

    return (
        <div key={product.productID} className="bg-gray-200 px-5 py-2 mb-5 rounded-lg border-2 border-black hover:shadow-md hover:shadow-black dark:bg-gray-900 dark:border-white dark:hover:bg-gray-800 dark:hover:shadow-white">
            <li className="flex py-2 sm:py-2 items-center">
                <div className="flex-shrink-0">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        width={"200px"}
                        className="rounded-md object-contain object-center shadow-xl border-4 border-black/60"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-row items-center justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 items-center">
                        <div>
                            <div className="flex justify-between">
                                <h3 className="text-lg ">
                                    <a href={product.href} className="font-bold text-black dark:text-white">
                                        {product.productName}
                                    </a>
                                </h3>
                            </div>
                            <div className="mt-1 flex items-end">
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                                    ₹ {product.productPrice}
                                </p>
                            </div>
                            <p className="text-lg font-semibold select-none mt-2">
                                {/* Calling the decrement action function to Reduce item by one */}
                                {product.productQuantity == 1 ? < MinusCircleIcon size={20} className="text-gray-500 inline mr-1" /> : < MinusCircleIcon size={20} className="text-black dark:text-white inline mr-1" onClick={() => { dispatch({ type: "DECREMENT_ITEM_IN_CART", payload: { productID: product.productID } }) }} />}
                                <span className='mx-2 text-bold text-lg'>{product.productQuantity}</span>
                                {/* Calling the Increment action function to increase item by one */}
                                <PlusCircleIcon size={20} className="text-black dark:text-white inline ml-1" onClick={() => { dispatch({ type: "INCREMENT_ITEM_IN_CART", payload: { productID: product.productID } }) }} />
                            </p>

                        </div>
                    </div>
                    <div className="text-lg font-semibold select-none ">

                        {/* Calling the remove item from cart Action function In state */}
                        <button type="button" className="group flex items-center space-x-1 rounded-lg p-2 hover:bg-red-800" onClick={() => {
                            dispatch({ type: "REMOVE_ITEM_IN_CART", payload: { productID: product.productID } })
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
