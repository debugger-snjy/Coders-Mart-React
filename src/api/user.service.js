import axios from "axios";
import { fetchToken, fetchUser } from "../utils/tokenOperations";
import { addItemToCart, getCartItems } from "./cart.service";
import { fetchProductAPI } from "./product.service"

const server = 'http://localhost:8000/v1/api';

// Function to create a new user
const createNewUserAPI = async (userData) => {
    const url = `${import.meta.env.VITE_APIURL}/user/register`;
    const data = {
        role: 'customer',
        gender: userData.gender ?? "",
        phone: userData.phone ?? "",
        name: userData.name ?? "",
        password: userData.password ?? "",
        email: userData.email ?? "",
        address: userData.address ?? "",
    };

    console.log("[api/user.service.js] Sign Up Data : ", data);

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('User Created Successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        return error?.response?.data;
    }
}

// Function to login a user
const loginUserAPI = async (userLoginData) => {
    const url = `${import.meta.env.VITE_APIURL}/user/login`;
    const data = {
        email: userLoginData.email ?? "",
        password: userLoginData.password ?? ""
    };

    console.log("[api/user.service.js] Login Data : ", data);

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = response.data;

        console.log('User Created Successfully:', responseData);
        console.log('User Token :', responseData.data.token);
        console.log('User :', responseData.data.user);
        console.log(responseData);

        if (responseData) {
            // Setting the Token in the Session Storage
            localStorage.setItem("token", JSON.stringify(responseData.data.token))

            // Saving the User Data in the SessionStorage
            localStorage.setItem("user", JSON.stringify(responseData.data.user))

            // Adding the LocalStorage Items in Cart
            const itemsInLocal = JSON.parse(localStorage.getItem("allcartItems")) ? JSON.parse(localStorage.getItem("allcartItems")).cartItems : [];
            console.log(itemsInLocal)

            if (itemsInLocal.length !== 0) {
                await Promise.all(itemsInLocal.map(async (item) => {
                    const response = await addItemToCart(item._id, item.productQuantity, false);
                    console.log("Saved : ", response.data)
                }))
            }

            console.log("All Saved!!s")

            const allItemsInCartResponse = await getCartItems();

            console.log(allItemsInCartResponse.data)

            let allCartItems = {
                user: responseData.data.user,
                cartItems: [],
                totalCartItems: 0
            };

            if (allItemsInCartResponse.data.userCart.length > 0) {
                console.log("Cart Updated !!!");
                allCartItems = {
                    user: responseData.data.user,
                    totalCartItems: allItemsInCartResponse.data.userCart.length === 0 ? 0 : allItemsInCartResponse.data.userCart[0].cartItems.reduce((prev, current) => prev + current.quantity, 0),
                    cartItems: allItemsInCartResponse.data.userCart.length === 0 ? [] : await Promise.all(allItemsInCartResponse.data.userCart[0].cartItems.map(async (item) => {

                        const productDetails = await fetchProductAPI(item.itemID)

                        return {
                            _id: item.itemID,
                            productName: item.itemName,
                            productPrice: item.itemPrice,
                            productDescription: item.itemDescription,
                            productImage: item.itemImage,
                            productQuantity: item.quantity,
                            productInStock: productDetails.data.product.productInStock,
                        }
                    }))
                }
            }

            localStorage.setItem("allcartItems", JSON.stringify(allCartItems))

        }

        return responseData;
    } catch (error) {
        console.error('Error creating user:', error);
        return error?.response?.data;
    }
}

// Function to login a user
const logoutUserAPI = async () => {
    const url = `${import.meta.env.VITE_APIURL}/user/logout`;

    const user = fetchUser();
    const token = fetchToken();

    if (user === null || token === null) {
        return null;
    }

    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = response.data;

        if (responseData.success) {
            // Deleting the Token in the Session Storage
            localStorage.removeItem("token", JSON.stringify(responseData.data.token))

            // Deleting the User Data in the SessionStorage
            localStorage.removeItem("user", JSON.stringify(responseData.data.user))

            // Removing the LocalStorage Items
            localStorage.removeItem("allcartItems");

        }

        return responseData;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}


export {
    createNewUserAPI,
    loginUserAPI,
    logoutUserAPI,
}