import React, { useEffect, useState } from 'react'
import ProductItem from "../Product/ProductItem"
import useTheme from "../../context/themeContext"

import { addProductsAPI, fetchAllProductsAPI } from "../../api/product.service.js"
import toast from 'react-hot-toast';

function Home() {

    // Dummy data for products
    const [products, setProducts] = useState([]);

    const { themeMode } = useTheme()

    const fetchProducts = async () => {
        const productData = await fetchAllProductsAPI();
        if (productData) {
            setProducts(productData.data.products);
        }
    };

    const addDummyProducts = async () => {
        const addProductResponse = await addProductsAPI();
        if (addProductResponse.success) {
            toast.success("Added Dummy Products")
            fetchProducts();
        }
        else {
            toast.success("Error Adding Dummy Products")
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className={`container-xxl px-10 py-10 w-full bg-white dark:bg-[#252d37]`} style={products.length === 0 ? { height: '100vh' } : {}}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                    {products && console.log(products)}

                    {/* Mapping over all available products */}
                    {products && products.map((product, index) => (
                        // Getting the product item card
                        <ProductItem key={product._id} product={product} />
                    ))}

                </div>
                {/* {products.length === 0 && <div className='text-2xl text-red-800 font-bold dark:text-red-400 text-center w-full'>
                    No Product Items Are Added !!<br />
                    <button type="button" onClick={addDummyProducts} className="mt-5 px-10 py-3 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 font-medium rounded-lg text-sm text-center inline-flex items-center me-2 mb-2">
                        <span className="text-md text-white dark:text-black font-bold">Add Dummy Data</span>
                    </button>
                </div>} */}

                {products.length === 0 && <div class='flex space-x-2 justify-center items-center mt-5'>
                    <span class='sr-only'>Loading...</span>
                    <div class='h-8 w-8 dark:bg-white bg-[#252d37] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 dark:bg-white bg-[#252d37] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8 dark:bg-white bg-[#252d37] rounded-full animate-bounce'></div>
                </div>}
            </div>
        </>
    )
}

export default Home
