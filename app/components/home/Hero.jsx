"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative">

      {/* Left Arrow */}
      <button
        id="hero-prev"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/70 p-3 rounded-full hover:bg-white shadow-lg"
      >
        <ChevronLeft className="text-purple-600" />
      </button>

      {/* Right Arrow */}
      <button
        id="hero-next"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/70 p-3 rounded-full hover:bg-white shadow-lg"
      >
        <ChevronRight className="text-purple-600" />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: "#hero-prev",
          nextEl: "#hero-next",
        }}
        className="h-[500px]"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center text-white flex items-center"
            style={{ backgroundImage: "url('/images/banner.jpg')" }}
          >
            <div className="container mx-auto px-6 max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">Summer Sale is Live!</h1>
              <p className="text-xl mb-8 text-purple-100">
                Get up to 50% off on all products. Limited time offer. Don’t miss out!
              </p>

              <div className="flex space-x-4">
                <Link href="/allproducts">
                  <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300">
                    Shop Now
                  </button>
                </Link>

                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center text-white flex items-center"
            style={{ backgroundImage: "url('/images/banner-2.jpg')" }}
          >
            <div className="container mx-auto px-6 max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">New Arrivals!</h1>
              <p className="text-xl mb-8 text-purple-100">
                Fresh collection just dropped. Trending styles for everyone.
              </p>

              <div className="flex space-x-4">
                <Link href="/allproducts">
                  <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300">
                    Shop Now
                  </button>
                </Link>

                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

  {/* SLIDE 3 */}
    <SwiperSlide>
          <div
            className="h-full w-full bg-cover bg-center text-white flex items-center"
            style={{ backgroundImage: "url('/images/banner-3.jpg')" }}
          >
            <div className="container mx-auto px-6 max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">New Arrivals!</h1>
              <p className="text-xl mb-8 text-purple-100">
                Fresh collection just dropped. Trending styles for everyone.
              </p>

              <div className="flex space-x-4">
                <Link href="/allproducts">
                  <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300">
                    Shop Now
                  </button>
                </Link>

                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
