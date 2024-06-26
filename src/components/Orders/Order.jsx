import React, { useEffect, useState } from 'react'
import { getAllPlacedOrders } from "../../api/order.service.js"
import { isUserLoggedIn } from '../../utils/tokenOperations.js';
import { useNavigate } from 'react-router-dom';
import PlacedOrderItem from './PlacedOrderItem.jsx';

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

    }, [setPlacedOrders]); // Dependency array with id

    return (
        <div className=" dark:bg-[#252d37] dark:text-white" style={{ height: "90vh" }}>
            {
                placedOrders && placedOrders.map((order)=>
                    <>
                        {/* Order Amount : {order.orderAmount}
                        Address : {order.orderAddress}*/}
                        {/* Payment Mode : {order.paymentMode}  */}
                        <PlacedOrderItem key={order._id} order={order}/>
                    </>
                )
            }
        </div>
    )
}

export default Order
