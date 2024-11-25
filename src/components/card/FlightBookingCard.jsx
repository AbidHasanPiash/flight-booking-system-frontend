import { FaPlaneDeparture, FaRegCalendarAlt, FaClock, FaChair, FaPlaneArrival } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FlightBookingCard({flight}) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex justify-between">
            <div className="p-2 md:p-4 xl:p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">{flight.airline}</h3>
                </div>
                <div className="mt-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <FaPlaneDeparture className="text-blue-500" />
                        <span>{flight.origin}</span>
                        <span>→</span>
                        <FaPlaneArrival className="text-blue-500" />
                        <span>{flight.destination}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-600">
                        <FaRegCalendarAlt className="text-blue-500" />
                        <span>{new Date(flight.departureDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-600">
                        <FaClock className="text-blue-500" />
                        <span>{flight.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-600">
                        <FaChair className="text-blue-500" />
                        <span>{flight.availableSeats} seats available</span>
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col items-center justify-center p-2 md:p-4 xl:p-6 space-y-4 bg-blue-200">
                <p className="text-lg font-bold text-blue-600">${flight.price.toFixed(2)}</p>
                <Link to={`/flight/${flight?._id}`} className="px-4 py-2 flex items-center space-x-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200">
                    <FaTag />
                    <span>Book Now</span>
                </Link>
            </div>
        </div>
    )
}
