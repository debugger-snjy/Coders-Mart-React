import { Link } from 'react-router-dom';
import React from 'react'

function PlacedItem({ product }) {
    return (
        <div key={product._id} className="bg-gray-200 px-5 py-2 rounded-lg border-[1px] border-black hover:shadow-md hover:shadow-black dark:bg-gray-900 dark:border-white dark:hover:bg-gray-800 dark:hover:shadow-white">
            <li className="flex py-2 sm:py-2 items-center">
                <div className="flex-shrink-0">
                    <img
                        src={product.itemImage}
                        alt={product.itemName}
                        width={"200px"}
                        className="rounded-md object-contain object-center shadow-xl border-4 border-black/60"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-row items-center justify-between sm:ml-6">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-lg ">
                                <Link to={`/product/${product.itemID}`} className="font-bold text-black dark:text-white">
                                    {product.itemName}
                                </Link>
                            </h3>
                        </div>
                        <div className="mt-1 flex items-end">
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                                ₹ {product.itemPrice}
                            </p>
                        </div>
                        <div className="mt-4 flex items-end">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                Quantity : {product.quantity}
                            </p>
                        </div>  
                    </div>
                </div>
            </li>
        </div>
    )
}

export default PlacedItem
