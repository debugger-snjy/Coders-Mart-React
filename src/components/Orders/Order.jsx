import React, { useEffect, useState } from 'react'
import { getAllPlacedOrders } from "../../api/order.service.js"
import { isUserLoggedIn } from '../../utils/tokenOperations.js';
import { useNavigate } from 'react-router-dom';
import PlacedOrderItem from './PlacedOrderItem.jsx';
import moment from 'moment-timezone';

function Order() {

    const [placedOrders, setPlacedOrders] = useState();
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
        <div className=" dark:bg-[#252d37] p-10 dark:text-white" style={placedOrders && placedOrders.length < 2 ? { height: "100vh" } : {}}>
            {
                placedOrders && placedOrders.reverse().map((order, index) =>
                    <>
                        {/* Order Amount : {order.orderAmount}
                        Address : {order.orderAddress}*/}
                        {/* Payment Mode : {order.paymentMode}  */}
                        {/* <PlacedOrderItem key={order._id} order={order} /> */}
                        <div class="flex gap-x-3 gap-y-4 pt-5">
                            <div class="text-end" style={{ width: '12%' }}>
                                {/* <span class="text-xs text-gray-500 dark:text-neutral-400">{order.createdAt}</span> */}
                                <span class="text-sm text-black dark:text-white font-bold">{new moment(new Date(order.createdAt)).tz('Asia/Kolkata').format('D MMM yyyy')}</span><br/>
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
        </div>
    )
}

export default Order
