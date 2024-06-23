import { getCartItems } from "../api/cart.service";

const isUserLoggedIn = () => {
    if (localStorage.getItem('token')) {
        return true;
    }
    return false;
}

const fetchToken = () => {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token');
    }
    return null;
}

const fetchUser = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    }
    return null;
}

export {
    isUserLoggedIn,
    fetchToken,
    fetchUser
}