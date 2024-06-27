import React, { useContext, useEffect, useState } from 'react';
import { fetchProductAPI } from '../../api/product.service';
import { useParams } from 'react-router-dom';
import ProductItem from './ProductItem';
import { cartContext } from '../../context/cartContext';
import { MinusCircleIcon, PlusCircleIcon, ShoppingBagIcon } from 'lucide-react';

function ProductDetails() {

    // Getting the state & dispatch object from context. 
    const { dispatch, state } = useContext(cartContext)

    // State variable To maintain the quantity of the product
    const [qty, setQty] = useState(1);

    const [product, setProduct] = useState();

    // to get data from state
    const { cartItems, totalCartItems } = state;

    const { id } = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productData = await fetchProductAPI(id);
                console.log(productData);
                setProduct(productData.data.product);
                console.log(product)
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();

    }, [setProduct]); // Dependency array with id

    return (
        <>
            <div className='p-10 bg-white dark:bg-[#252d37] dark:text-white'>
                {product && (

                    <div className="flex flex-col space-y-4">
                        <div className="overflow-hidden rounded-md relative">
                            {product.productInStock && product.productInStock === 0 ? <span className="ribbon">OUT OF STOCK</span> : product.productInStock <= 5 ? <span className="ribbon bg-yellow-200 text-black">FEW REMAINING</span> : ''}
                            <img
                                alt="Product gallery 1"
                                src={`${product.productImage}`}
                                className="w-full object-cover"
                                style={(cartItems && cartItems.length < 2) ? { height: "100vh" } : {}}
                            />
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold">{product.productName}</h2>
                                <p className="text-lg font-semibold m-0">₹{product.productPrice}</p>
                            </div>
                            <div className='flex flex-row space-x-5'>
                                {product.productInStock !== 0 && <div>
                                    <div className='text-lg font-medium'>Quantity</div>
                                    <p className="text-lg font-semibold select-none">

                                        {/* Decreasing product quantity to Order */}
                                        {qty == 1 ? < MinusCircleIcon size={20} className="text-gray-500 dark:text-gray-700 inline mr-1" disabled={true} onClick={() => setQty((prevQty) => prevQty == 1 ? prevQty : prevQty - 1)} /> : < MinusCircleIcon size={20} className="text-black dark:text-white inline mr-1" onClick={() => setQty((prevQty) => prevQty == 1 ? prevQty : prevQty - 1)} />}
                                        <span className='mx-2 text-bold text-lg'>{qty}</span>
                                        {/* Increasing product quantity to Order  */}
                                        {/* <PlusCircleIcon size={20} className="text-black dark:text-white inline ml-1" onClick={() => setQty((prevQty) => prevQty + 1)} /> */}
                                        {qty >= product.productInStock ? < PlusCircleIcon size={20} className="text-gray-500 dark:text-gray-700 inline ml-1" disabled={true} /> : < PlusCircleIcon size={20} className="text-black dark:text-white inline ml-1" onClick={() => setQty((prevQty) => prevQty + 1)} />}
                                    </p>
                                </div>}
                                <div>
                                    {/* Button to add the item in the card */}
                                    {
                                        product.productInStock === 0 ?
                                            <button
                                                type="button"
                                                className="select-none rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-gray-400 dark:text-gray-800"
                                                disabled:true
                                            >
                                                OUT OF STOCK
                                            </button>
                                            :
                                            <button
                                                type="button"
                                                className="select-none flex rounded-md bg-black px-10 py-5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-white/80  dark:focus-visible:outline-white"
                                                onClick={
                                                    async () => {
                                                        console.log("Product : ", product);
                                                        dispatch({ type: "ADD_ITEM_IN_CART", payload: { item: { ...product, productQuantity: qty } } })
                                                        if (isUserLoggedIn()) {
                                                            await addItemToCart(product._id, qty, true)
                                                            toast.success(response.data.message);
                                                        }
                                                        setQty(1)
                                                    }
                                                }
                                            >
                                                <ShoppingBagIcon className='inline mr-1' height={"24px"} width={"24px"} /> <span className="text-base font-bold">Add To Cart</span>
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between space-y-2">
                            <div>
                                <h3 className="text-lg font-medium">Product Details : </h3>
                                <p className="text-sm">
                                    {product.productDescription}
                                </p>
                                <h3 className="text-lg font-medium mt-3">Product In Stock : </h3>
                                <p className="text-sm">
                                    {product.productInStock}
                                </p>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetails;
