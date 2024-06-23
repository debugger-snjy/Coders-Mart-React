import axios from "axios";
import { fetchToken, fetchUser } from "../utils/tokenOperations";

const server = 'http://localhost:8000/v1/api';

const placeOrderAPI = async (paymentMode, address) => {
    const url = `${server}/order/`;

    try {
        const response = await axios.post(url, {
            paymentMode,
            address
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        });

        const orderData = response.data;
        console.log(orderData)

        return orderData;
    } catch (error) {
        console.error('Error Placing Order :', error);
        return null;
    }
}

export {
    placeOrderAPI
}