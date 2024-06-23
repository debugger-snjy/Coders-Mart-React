import { createContext, useReducer } from "react"
import { toast } from 'react-hot-toast';


// Initial State for the Cart
// No Need for the initialState, as we fetch the data frm the localStorage
const initialState = {
    totalCartItems: 0,
    cartItems: [
        // {
        //     productID: 1,
        //     productName: "Nike Airmax Pro V2",
        //     productPrice: 20874.80,
        //     productDescription: "A chip (often just chip, or crisp in British and Irish English) may be a thin slice of potato that has been either deep fried or baked until crunchy. theyre commonly served as a snack, side dish, or appetizer.",
        //     productImage: "https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
        //     productQuantity: 0,
        // }
    ]
}

// Creating the Context
export const cartContext = createContext();

// Function to store the data in the localStorage
const storeInLocalStorage = (data) => {
    localStorage.setItem("allCartItems", JSON.stringify(data))
}

// Creating the Cart Reducer Function
const cartReducer = (state, action) => {
    switch (action.type) {

        // Action to Add item in cart
        case "ADD_ITEM_IN_CART":
            console.log(action.payload.item)
            // Checking whether the item already exists in the cart or not
            const isItemFoundInCart = state.cartItems.find((item) => item.productID === action.payload.item.productID)

            // If item already in cart 
            if (isItemFoundInCart) {
                // Then we have to increase the quantity by productQuantity only
                // state.cartItems.map((item) => item.productID === action.payload.item.productID ? { ...item, productQuantity: item.productQuantity + action.payload.item.productQuantity } : item)
                // console.log("Demo Data : ", state.cartItems)

                // Showing the success toast message
                toast.success(action.payload.item.productName + " Added to Cart 🛒")

                // Getting updated state
                let updatedState = {
                    ...state,
                    totalCartItems: state.totalCartItems + action.payload.item.productQuantity,
                    cartItems: state.cartItems.map((item) => item.productID === action.payload.item.productID ? { ...item, productQuantity: item.productQuantity + action.payload.item.productQuantity } : item)
                }


                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }

            // If item not in cart, then new item
            else {

                // Showing the success toast message
                toast.success(action.payload.item.productName + " Added to Cart 🛒")

                // Getting updated state
                let updatedState = {
                    ...state,
                    totalCartItems: state.totalCartItems + action.payload.item.productQuantity,
                    cartItems: [
                        ...state.cartItems,
                        { ...action.payload.item }
                    ]
                }


                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }

        // Action to Remove item From the cart 
        case "REMOVE_ITEM_IN_CART":
            const isDeletedItemExist = state.cartItems.find((item) => item.productID === action.payload.productID) ?? false
            if (isDeletedItemExist) {
                // Then we have to increase the quantity by 1 only
                let updatedState = {
                    ...state,
                    totalCartItems: state.totalCartItems - isDeletedItemExist.productQuantity,
                    cartItems: [...state.cartItems.filter((item) => item.productID !== action.payload.productID)]
                }

                // Showing the success toast message
                toast.success("Successfully Removed from Cart 🛒")

                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;

            }
            else {
                // Showing the error toast message
                toast.error("Item Not Found 🛍️")

                let updatedState = state;

                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }

        case "INCREMENT_ITEM_IN_CART":
            // Checking whether the item already exists in the cart or not
            const isIncrementedItemExist = state.cartItems.find((item) => item.productID === action.payload.productID) ?? false
            if (isIncrementedItemExist) {
                // Then we have to increase the quantity by 1 only
                let updatedState = {
                    ...state,
                    totalCartItems: state.totalCartItems + 1,
                    cartItems: state.cartItems.map((item) => item.productID === action.payload.productID ? { ...item, productQuantity: item.productQuantity + 1 } : item)
                }

                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }
            else {
                // Showing the error toast message
                toast.error("Item Not Found 🛍️")

                let updatedState = state;

                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }

        case "DECREMENT_ITEM_IN_CART":
            // Checking whether the item already exists in the cart or not
            const isDecrementedItemExist = state.cartItems.find((item) => item.productID === action.payload.productID) ?? false
            if (isDecrementedItemExist && isDecrementedItemExist.productQuantity >= 1) {
                // Then we have to increase the quantity by 1 only
                let updatedState = {
                    ...state,
                    totalCartItems: state.totalCartItems - 1,
                    cartItems: state.cartItems.map((item) => item.productID === action.payload.productID ? { ...item, productQuantity: item.productQuantity - 1 } : item)
                }

                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }
            else {
                // Showing the error toast message
                toast.error("Item Not Found 🛍️")

                let updatedState = state;

                // Storing the data in local host
                storeInLocalStorage(updatedState)

                return updatedState;
            }

        default:
            let updatedState = state;

            // Storing the data in local host
            storeInLocalStorage(updatedState)

            return updatedState;
    }
}

// Creating the Cart Provider to use the store data anywhere
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, JSON.parse(localStorage.getItem("allCartItems")) == null ? initialState : JSON.parse(localStorage.getItem("allCartItems")))

    return (
        <cartContext.Provider value={{ state, dispatch }}>
            {children}
        </cartContext.Provider>
    )
}