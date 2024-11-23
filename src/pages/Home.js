import React from "react";
// import { Link } from "react-router-dom";
import SearchCard from "../components/card/SearchCard";

export default function Home() {
    return (
        <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-500 to-indigo-900 text-white">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto p-2 md:p-4">
                <div className="w-full h-full flex flex-col space-y-10 justify-between">
                    
                    {/* Hero text */}
                    <div className="flex flex-col items-center justify-center mx-auto">
                        <div className="max-w-2xl">
                            <h2 className="text-center text-3xl md:text-4xl xl:text-5xl font-extrabold mb-6">Your Gateway to the World</h2>
                            <p className="text-sm text-center md:text-base mb-8">
                                Find the best deals on flights and book your journey with ease. Adventure awaits at your fingertips.
                            </p>
                        </div>

                        {/* Quick Links */}
                        {/* <div className="flex gap-6 mx-auto">
                            <Link to="/flights">
                                <button className="px-6 py-3 bg-indigo-500 rounded-lg font-medium hover:bg-indigo-600">
                                    Browse Flights
                                </button>
                            </Link>
                            <Link to="/booking">
                                <button className="px-6 py-3 bg-teal-500 rounded-lg font-medium hover:bg-teal-600">
                                    Manage Bookings
                                </button>
                            </Link>
                        </div> */}
                    </div>

                    {/* Search bar */}
                    <SearchCard/>

                    {/* Hero Image */}
                    <div className="mx-auto flex flex-grow">
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src="/images/homepage-plan-image.png"
                                alt="Airplane flying into the sunset"
                                className="aspect-auto object-contain p-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            <section className="w-full bg-white py-10">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <img
                        src="https://via.placeholder.com/500x300?text=Airport+Runway"
                        alt="Airport Runway"
                        className="rounded-lg shadow-lg"
                    />
                    <img
                        src="https://via.placeholder.com/500x300?text=Flight+Boarding"
                        alt="Flight Boarding"
                        className="rounded-lg shadow-lg"
                    />
                    <img
                        src="https://via.placeholder.com/500x300?text=Inside+Airplane"
                        alt="Inside Airplane"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>
        </div>
    );
}
