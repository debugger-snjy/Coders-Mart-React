import axios from "axios";
import { fetchToken, fetchUser } from "../utils/tokenOperations";

const server = 'http://localhost:8000/v1/api';

const fetchAllProductsAPI = async () => {
    const url = `${server}/products/`;

    try {
        const response = await axios.get(url, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const productData = response.data;
        console.log(productData)

        return productData;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

const addProductsAPI = async () => {
    const url = `${server}/products/add`;

    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const productData = response.data;
        console.log(productData)

        return productData;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

const fetchProductAPI = async (id) => {
    const url = `${server}/products/${id}`;

    try {
        const response = await axios.get(url, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const productData = response.data;
        console.log(productData)

        return productData;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export {
    fetchAllProductsAPI,
    addProductsAPI,
    fetchProductAPI
}