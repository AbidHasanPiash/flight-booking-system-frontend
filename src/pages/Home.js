import React from "react";
import { Link } from "react-router-dom";
import appConfig from "../configs/appConfig";

export default function Home() {
  return (
    <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-500 to-indigo-900 text-white">

      <section className="h-screen flex flex-col p-2 md:p-4">
        {/* Hero Section */}
        <header className="w-full flex justify-between items-center">
          <h1 className="text-lg md:text-xl xl:text-2xl font-bold">{appConfig.Name}</h1>
          <nav>
            <ul className="flex text-sm md:text-base gap-4">
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
          
          <div className="grid gap-10 w-full h-full">
            
            <div className="flex flex-col items-end justify-end mx-auto">
              
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-6">Your Gateway to the World</h2>
                <p className="text-sm md:text-base xl:text-lg mb-8">
                  Find the best deals on flights and book your journey with ease. Adventure awaits at your fingertips.
                </p>
              </div>

              {/* Quick Links */}
              <div className="flex gap-6 mt-10 mx-auto">
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
              </div>
            </div>

            {/* Hero Image */}
            <div className="mx-auto">
              <img
                src="/images/homepage-plan-image.png"
                alt="Airplane flying into the sunset"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </main>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>© 2024 Skyline Flights. All rights reserved.</p>
      </footer>
    </div>
  );
}
