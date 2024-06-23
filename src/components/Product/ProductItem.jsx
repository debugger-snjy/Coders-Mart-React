import React, { useContext, useState } from 'react';
import { cartContext } from '../../context/cartContext';
import { Minus, MinusCircleIcon, Plus, PlusCircleIcon } from 'lucide-react';

function ProductItem({ product }) {

    // Getting the state & dispatch object from context. 
    const { dispatch, state } = useContext(cartContext)

    // State variable To maintain the quantity of the product
    const [qty, setQty] = useState(1);

    console.log("Data in Cart : ", state.cartItems)

    return (
        <div className="p-4 rounded-lg border-gray-500 border-2 hover:shadow-gray-600 bg-gray-300 hover:border-3 dark:bg-gray-900 dark:text-white dark:hover:shadow-gray-400 dark:hover:border-white dark:hover:border-3">
            <div className="flex flex-col space-y-4">
                <div className="overflow-hidden rounded-md">
                    <img
                        alt="Product gallery 1"
                        src={`${product.productImage}`}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">{product.productName}</h2>
                        <p className="text-lg font-semibold m-0">${product.productPrice}</p>
                    </div>
                    <div>
                        <div className='text-lg font-medium'>Quantity</div>
                        <p className="text-lg font-semibold select-none">

                            {/* Decreasing product quantity to Order */}
                            {qty == 1 ? < MinusCircleIcon size={20} className="text-gray-500 dark:text-gray-700 inline mr-1" disabled={true} onClick={() => setQty((prevQty) => prevQty == 1 ? prevQty : prevQty - 1)} /> : < MinusCircleIcon size={20} className="text-black dark:text-white inline mr-1" onClick={() => setQty((prevQty) => prevQty == 1 ? prevQty : prevQty - 1)} />}
                            <span className='mx-2 text-bold text-lg'>{qty}</span>
                            {/* Increasing product quantity to Order  */}
                            <PlusCircleIcon size={20} className="text-black dark:text-white inline ml-1" onClick={() => setQty((prevQty) => prevQty + 1)} />
                        </p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    
                    {/* Button to add the item in the card */}
                    <button
                        type="button"
                        className="select-none rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-white/80  dark:focus-visible:outline-white"
                        onClick={
                            () => {
                                console.log("Product : ", product);
                                dispatch({ type: "ADD_ITEM_IN_CART", payload: { item: { ...product, productQuantity: qty } } })
                                setQty(1)
                            }
                        }
                    >
                        Add To Cart
                    </button>
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
