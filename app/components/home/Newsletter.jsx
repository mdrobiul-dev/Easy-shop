import React from 'react'

const Newsletter = () => {
  return (
    <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-purple-700 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
  )
}

export default Newsletter