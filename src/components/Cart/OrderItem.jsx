import React from 'react'

function OrderItem({ product }) {

    return (
        <div key={product.itemID} className="bg-gray-200 px-5 py-2 rounded-lg border-2 border-black hover:shadow-md hover:shadow-black dark:bg-gray-900 dark:border-white dark:hover:bg-gray-800 dark:hover:shadow-white">
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
                        <div className="mt-4 flex items-end">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                Quantity : {product.productQuantity}
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default OrderItem
