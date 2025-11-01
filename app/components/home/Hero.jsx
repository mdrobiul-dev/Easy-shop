import React from 'react'

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Summer Sale is Live!</h1>
            <p className="text-xl mb-8 text-purple-100">
              Get up to 50% off on all products. Limited time offer. Dont miss
              out!
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero