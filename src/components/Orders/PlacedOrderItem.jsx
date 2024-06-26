import React from 'react'
import OrderItem from "../Cart/OrderItem"
import PlacedItem from './PlacedItem'
import { Link } from 'react-router-dom'

function PlacedOrderItem({ order }) {
    console.log(order)
    return (
        <section className="bg-white antialiased dark:bg-[#252d37] divide-y-8">
            <div className="max-w-screen-xl 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{order._id}</h2>

                <div className="m-10 sm:mt-8 lg:flex lg:gap-8">
                    <div className="w-full overflow-hidden rounded-lg  dark:divide-gray-700  lg:max-w-xl xl:max-w-2xl">
                        {
                            console.log(order.orderItems)
                        }
                        {
                            order.orderItems && order.orderItems.map((item) => {
                                return (<Link className="space-y-4 m-2" to={`/product/${item.itemID}`}>
                                    <PlacedItem key={item._id} product={item} />
                                </Link>)
                            })
                        }

                    </div>

                    <div className="mt-6 grow sm:mt-8 lg:mt-0 ">
                        <div className="space-y-6 rounded-lg border bg-gray-200 dark:bg-gray-700 border-gray-600 p-6 shadow-sm dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order Details</h3>

                            <div className="space-y-4 bg-gray-400 rounded-lg p-6 dark:bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-800 dark:text-gray-400">Original price</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">₹ {order.orderAmount + 1000 + 3431}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-800 dark:text-gray-400">Discount</dt>
                                        <dd className="text-base font-medium dark:text-green-400 text-green-800">₹ 3,431</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-800 dark:text-gray-400">Shipping</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">₹ 1,000</dd>
                                    </dl>

                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-lg font-bold text-gray-900 dark:text-white">₹ {order.orderAmount}</dd>
                                </dl>
                            </div>

                            <div className="text-center text-lg font-extrabold w-full dark:text-green-400 text-green-800">
                                🎉 ORDER DELIVERED SUCCESSFULLY 🎉
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlacedOrderItem
