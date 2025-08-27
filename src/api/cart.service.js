import axios from "axios";
import { fetchToken, fetchUser } from "../utils/tokenOperations";
import toast from "react-hot-toast";

const server = 'http://localhost:8000/v1/api';

const addItemToCart = async (productID, quantity, showMsg) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APIURL}/cart/`, {
            productID,
            quantity,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        });

        if (response.status === 200) {
            if (showMsg) {
                toast.success(response.data.message);
            }
            return response.data;
        } else {
            throw new Error(`Error adding item to cart: ${response.data.message}`);
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

const removeItemFromCart = async (productID) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_APIURL}/cart/item/${productID}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error removing item from cart: ${response.data.message}`);
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

const updateQuantityInCartItem = async (productID, quantity, operation) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_APIURL}/cart/`, {
            productID,
            quantity,
            qtyOperation: operation, // "add" or "remove"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(
                `Error updating quantity in cart item: ${response.data.message}`
            );
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

const getCartItems = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APIURL}/cart/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error getting cart items: ${response.data.message}`);
        }
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
}

const emptyCart = async () => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_APIURL}/cart/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error emptying cart: ${response.data.message}`);
        }
    } catch (error) {
        console.error(error);
        return false; // Indicate failure on error
    }
}


export {
    addItemToCart,
    removeItemFromCart,
    updateQuantityInCartItem,
    getCartItems,
    emptyCart
}