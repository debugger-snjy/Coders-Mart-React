import React, { useEffect, useState } from 'react'
import ProductItem from "../Product/ProductItem"
import useTheme from "../../context/themeContext"

function Home() {

    // Dummy data for products
    const allAvailableProducts = [
        {
            "productID": 2,
            "productName": "Adidas Ultraboost 21",
            "productPrice": 18999.99,
            "productDescription": "The Adidas Ultraboost 21 features responsive cushioning and a lightweight design, perfect for runners.",
            "productImage": "https://images.unsplash.com/photo-1505248254168-1de4e1abfa78",
            "productQuantity": 0
        },
        {
            "productID": 3,
            "productName": "Puma RS-X",
            "productPrice": 15500.00,
            "productDescription": "The Puma RS-X features a chunky design and bold colorways, combining style and comfort.",
            "productImage": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            "productQuantity": 0
        },
        {
            "productID": 4,
            "productName": "Reebok Nano X1",
            "productPrice": 14000.75,
            "productDescription": "The Reebok Nano X1 is designed for high-performance training, offering stability and support.",
            "productImage": "https://images.unsplash.com/photo-1530389912609-9a007b3c38a4",
            "productQuantity": 0
        },
        {
            "productID": 5,
            "productName": "New Balance 990v5",
            "productPrice": 17999.50,
            "productDescription": "The New Balance 990v5 blends classic style with modern comfort, featuring premium materials and cushioning.",
            "productImage": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
            "productQuantity": 0
        },
        {
            "productID": 6,
            "productName": "Asics Gel-Kayano 27",
            "productPrice": 16000.00,
            "productDescription": "The Asics Gel-Kayano 27 provides excellent stability and cushioning for long-distance running.",
            "productImage": "https://images.unsplash.com/photo-1605408499391-6368c628ef42",
            "productQuantity": 0
        },
        {
            "productID": 7,
            "productName": "Under Armour HOVR Phantom",
            "productPrice": 17000.99,
            "productDescription": "The Under Armour HOVR Phantom offers a zero-gravity feel to maintain energy return that helps eliminate impact.",
            "productImage": "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8",
            "productQuantity": 0
        },
        {
            "productID": 8,
            "productName": "Brooks Ghost 13",
            "productPrice": 15000.00,
            "productDescription": "The Brooks Ghost 13 features DNA LOFT cushioning for a smooth and stable ride.",
            "productImage": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
            "productQuantity": 0
        },
        {
            "productID": 9,
            "productName": "Hoka One One Clifton 7",
            "productPrice": 16500.45,
            "productDescription": "The Hoka One One Clifton 7 provides lightweight comfort and a smooth ride.",
            "productImage": "https://images.unsplash.com/photo-1562183241-b937e95585b6",
            "productQuantity": 0
        },
        {
            "productID": 10,
            "productName": "Saucony Endorphin Speed",
            "productPrice": 18500.00,
            "productDescription": "The Saucony Endorphin Speed features a responsive nylon plate and PWRRUN PB cushioning.",
            "productImage": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
            "productQuantity": 0
        },
    ]

    return (
        <>
            <div className={`container-xxl px-10 py-10 w-full bg-white dark:bg-[#252d37]`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                    {/* Mapping over all available products */}
                    {allAvailableProducts.map((product, index) => (
                        // Getting the product item card
                        <ProductItem key={product.productID} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
