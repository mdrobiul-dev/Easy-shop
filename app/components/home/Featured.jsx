    import Link from 'next/link'
    import React from 'react'
    import Image from "next/image"
    import { featuredProducts } from '@/app/data/data'

    const Featured = ({addToCart}) => {
    return (
    <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <Link
                href="/allproducts"
                className="text-purple-600 font-semibold hover:text-purple-800 transition duration-300"
                >
                View All →
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                <div
                    key={product.id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                    <div className="h-48 bg-gray-200 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    </div>
                    <div className="p-4">
                    <span className="text-sm text-purple-600 font-medium">
                        {product.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-gray-800">
                        {product.price}
                        </span>
                        <button
                        onClick={addToCart}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                        >
                        Add to Cart
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
    )
    }

    export default Featured