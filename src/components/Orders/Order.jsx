import React, { useEffect, useState } from 'react'
import { getAllPlacedOrders } from "../../api/order.service.js"
import { isUserLoggedIn } from '../../utils/tokenOperations.js';
import { useNavigate } from 'react-router-dom';
import PlacedOrderItem from './PlacedOrderItem.jsx';
import moment from 'moment-timezone';
import emptyCart from "../../assets/empty-cart.png"

function Order() {

    const [placedOrders, setPlacedOrders] = useState([]);
    let navigateTo = useNavigate();

    useEffect(() => {

        if (isUserLoggedIn()) {
            const fetchOrdersData = async () => {
                try {
                    const ordersData = await getAllPlacedOrders();
                    console.log(ordersData.data.orders);
                    setPlacedOrders(ordersData.data.orders);
                } catch (error) {
                    console.error("Error fetching placedOrders data:", error);
                }
            };

            fetchOrdersData();
        }
        else {
            navigateTo("/")
        }

    }, []); // Dependency array with id

    return (
        <div className=" dark:bg-[#252d37] px-10 pt-10 dark:text-white" style={placedOrders && placedOrders.length < 2 ? { height: "100vh" } : {}}>
            {
                placedOrders && placedOrders.length > 0 && placedOrders.reverse().map((order, index) =>
                    <>
                        {/* Order Amount : {order.orderAmount}
                        Address : {order.orderAddress}*/}
                        {/* Payment Mode : {order.paymentMode}  */}
                        {/* <PlacedOrderItem key={order._id} order={order} /> */}
                        <div class="flex gap-x-3 gap-y-4 pt-5">
                            <div class="text-end" style={{ width: '12%' }}>
                                {/* <span class="text-xs text-gray-500 dark:text-neutral-400">{order.createdAt}</span> */}
                                <span class="text-sm text-black dark:text-white font-bold">{new moment(new Date(order.createdAt)).tz('Asia/Kolkata').format('D MMM yyyy')}</span><br />
                                <span class="text-sm text-black dark:text-white font-bold">{new moment(new Date(order.createdAt)).tz('Asia/Kolkata').format('hh:mm A')}</span>
                            </div>

                            {index !== placedOrders.length - 1 ? <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-black dark:after:bg-white">
                                <div class="relative z-10 size-7 flex justify-center items-center">
                                    <div class="size-3 rounded-full bg-black dark:bg-white"></div>
                                </div>
                            </div> :
                                <div class="relative">
                                    <div class="relative z-10 size-7 flex justify-center items-center">
                                        <div class="size-3 rounded-full bg-black dark:bg-white"></div>
                                    </div>
                                </div>
                            }

                            <div class="grow">
                                <PlacedOrderItem key={order._id} order={order} />
                            </div>
                        </div>
                    </>
                )
            }
            {
                placedOrders && placedOrders.length === 0 &&
                <div className='text-1xl font-bold text-center text-red-600 my-14 h-full'>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className='text-black dark:text-white text-2xl'>No Orders Placed Yet</h2>
                        <img src={emptyCart} className='w-1/4' alt="" />
                        <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200 mt-5">Looks Like you have not Order Anything. <br />Go Ahead And Enjoy Shopping</p>
                    </div>
                </div>

            }
        </div >
    )
}

export default Order
