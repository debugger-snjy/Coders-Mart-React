import React, { useEffect, useState } from 'react'
import ProductItem from "../Product/ProductItem"
import useTheme from "../../context/themeContext"

import { fetchAllProductsAPI } from "../../api/product.service.js"

function Home() {

    // Dummy data for products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productData = await fetchAllProductsAPI();
            if (productData) {
                setProducts(productData.data.products);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className={`container-xxl px-10 py-10 w-full bg-white dark:bg-[#252d37]`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                    {/* Mapping over all available products */}
                    {products && products.map((product, index) => (
                        // Getting the product item card
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
