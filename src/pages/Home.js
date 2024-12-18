import React from "react";
import { FaGlobe, FaHeadset, FaLock } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdAirplanemodeActive, MdOutlineFlightTakeoff } from "react-icons/md";
import SearchCard from "../components/card/SearchCard";

export default function Home() {
    return (
        <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-500 to-indigo-900 text-white">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col items-center space-y-10">
                {/* Hero Text */}
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
                        Your Gateway to the World
                    </h2>
                    <p className="text-base md:text-lg text-gray-200 mt-4">
                        Find the best deals on flights and book your journey with ease. Adventure awaits at your fingertips.
                    </p>
                </div>

                {/* Search Bar */}
                <SearchCard />

                {/* Hero Image */}
                <div className="relative w-full max-w-3xl mx-auto mt-10">
                    <img
                        src="/images/homepage-plan-image.png"
                        alt="Airplane flying into the sunset"
                    />
                    {/* Decorative Icon */}
                    <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md">
                        <MdOutlineFlightTakeoff className="text-blue-600 text-3xl" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white text-gray-800 py-10">
                <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold">Why Choose Us?</h3>
                    <p className="text-base md:text-lg">
                        With our platform, you get the most competitive flight deals, unmatched convenience, and a seamless booking experience.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
                            <FaGlobe className="text-blue-600 text-4xl mb-4" />
                            <h4 className="font-bold text-lg">Best Deals</h4>
                            <p>Enjoy exclusive discounts and offers on flights worldwide.</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
                            <FaHeadset className="text-blue-600 text-4xl mb-4" />
                            <h4 className="font-bold text-lg">24/7 Support</h4>
                            <p>Our customer support team is here to assist you anytime.</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
                            <FaLock className="text-blue-600 text-4xl mb-4" />
                            <h4 className="font-bold text-lg">Secure Booking</h4>
                            <p>Your information is protected with advanced encryption technology.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-blue-600 text-white py-10">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <MdAirplanemodeActive className="text-white text-5xl mb-4" />
                        <h4 className="text-4xl font-bold">500+</h4>
                        <p>Destinations</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <BsFillPersonCheckFill className="text-white text-5xl mb-4" />
                        <h4 className="text-4xl font-bold">1M+</h4>
                        <p>Happy Travelers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <MdOutlineFlightTakeoff className="text-white text-5xl mb-4" />
                        <h4 className="text-4xl font-bold">24/7</h4>
                        <p>Support Availability</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-100 text-gray-800 py-10">
                <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold">What Our Customers Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-4 border rounded-lg shadow-lg bg-white flex flex-col items-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Customer John"
                                className="w-16 h-16 rounded-full mb-4"
                            />
                            <p className="italic">"Booking flights has never been this easy! Highly recommended."</p>
                            <p className="mt-4 font-bold">- John D.</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-lg bg-white flex flex-col items-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Customer Sarah"
                                className="w-16 h-16 rounded-full mb-4"
                            />
                            <p className="italic">"Got the best deals and excellent customer service."</p>
                            <p className="mt-4 font-bold">- Sarah K.</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-lg bg-white flex flex-col items-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Customer Mark"
                                className="w-16 h-16 rounded-full mb-4"
                            />
                            <p className="italic">"Seamless experience from start to finish."</p>
                            <p className="mt-4 font-bold">- Mark L.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
