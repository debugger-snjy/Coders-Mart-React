import React, { useContext, useState } from 'react';
import { cartContext } from '../../context/cartContext';
import { Minus, MinusCircleIcon, Plus, PlusCircleIcon } from 'lucide-react';
import { addItemToCart, getCartItems, removeItemFromCart } from "../../api/cart.service.js";
import { isUserLoggedIn } from '../../utils/tokenOperations.js';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {

    // Getting the state & dispatch object from context. 
    const { dispatch, state } = useContext(cartContext)

    // State variable To maintain the quantity of the product
    const [qty, setQty] = useState(1);

    console.log("Data in Cart : ", state.cartItems)

    return (
        <div className="p-4 rounded-lg relative border-gray-500 border-2 hover:shadow-gray-600 bg-gray-300 hover:border-3 dark:bg-gray-900 dark:text-white dark:hover:shadow-gray-400 dark:hover:border-white dark:hover:border-3">

            {product.productInStock === 0 ? <span className="ribbon">OUT OF STOCK</span> : product.productInStock <= 5 ? <span className="ribbon bg-yellow-200 text-black">FEW REMAINING</span> : ''}
            <div className="flex flex-col space-y-4">
                <div className="overflow-hidden rounded-md">
                    <Link to={`/product/${product._id}`}>
                        <img
                            alt="Product gallery 1"
                            src={`${product.productImage}`}
                            className="w-full h-48 object-cover"
                        />
                    </Link>
                </div>
                <div className="w-full flex flex-row justify-between">

                    <div className="text-lg font-semibold">{product.productName}</div>
                    <div className="text-lg font-semibold">₹ {product.productPrice}</div>
                    {/* <div> */}
                    {/* <div className='text-lg font-medium'>Quantity</div> */}
                    {/* <p className="text-lg font-semibold select-none"> */}

                    {/* Decreasing product quantity to Order */}
                    {/* {qty == 1 ? < MinusCircleIcon size={20} className="text-gray-500 dark:text-gray-700 inline mr-1" disabled={true} onClick={() => setQty((prevQty) => prevQty == 1 ? prevQty : prevQty - 1)} /> : < MinusCircleIcon size={20} className="text-black dark:text-white inline mr-1" onClick={() => setQty((prevQty) => prevQty == 1 ? prevQty : prevQty - 1)} />} */}
                    {/* <span className='mx-2 text-bold text-lg'>{qty}</span> */}
                    {/* Increasing product quantity to Order  */}
                    {/* <PlusCircleIcon size={20} className="text-black dark:text-white inline ml-1" onClick={() => setQty((prevQty) => prevQty + 1)} /> */}
                    {/* </p> */}
                    {/* </div> */}
                </div>
                <div className="flex flex-col space-y-2">

                    {product.productInStock === 0 && <button
                        type="button"
                        className="select-none rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-gray-400 dark:text-gray-800"
                        disabled:true
                    >
                        OUT OF STOCK
                    </button>}

                    {product.productInStock > 0 &&
                        <>
                            {/* Button to add the item in the card */}
                            {((state.cartItems && state.cartItems.find((item) => item._id === product._id) === undefined) || !state.cartItems) && <button
                                type="button"
                                className="select-none rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-white/80  dark:focus-visible:outline-white"
                                onClick={
                                    async () => {
                                        console.log("Product : ", product);
                                        dispatch({ type: "ADD_ITEM_IN_CART", payload: { item: { ...product, productQuantity: 1 } } })
                                        if (isUserLoggedIn()) {
                                            await addItemToCart(product._id, qty, false)
                                        }
                                        setQty(1)
                                    }
                                }
                            >
                                Add To Cart
                            </button>}
                            {(state.cartItems && state.cartItems.find((item) => item._id === product._id) !== undefined) && <button
                                type="button"
                                className="select-none rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-white/80  dark:focus-visible:outline-white"
                                onClick={
                                    async () => {
                                        console.log("Product : ", product);
                                        dispatch({ type: "REMOVE_ITEM_IN_CART", payload: { _id: product._id } })
                                        if (isUserLoggedIn()) {
                                            await removeItemFromCart(product._id)
                                        }
                                        setQty(1)
                                    }
                                }
                            >
                                Remove From Cart
                            </button>}
                        </>}
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Product Details:</h3>
                    <p className="text-sm">
                        {product.productDescription}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
