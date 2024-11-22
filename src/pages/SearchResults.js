// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

export default function SearchResults() {
  // const [flights, setFlights] = useState([]);

  // useEffect(() => {
  //   // Fetch flights based on search criteria
  //   const fetchFlights = async () => {
  //     const response = await axios.get("/api/flights");
  //     setFlights(response.data);
  //   };
  //   fetchFlights();
  // }, []);

  return (
    <div className="search-results">
      <h2>Available Flights</h2>
      {/* <ul>
        {flights?.map((flight) => (
          <li key={flight._id}>
            <h3>{flight.airline}</h3>
            <p>{flight.origin} to {flight.destination}</p>
            <p>Price: ${flight.price}</p>
            <Link to={`/flight/${flight._id}`}>View Details</Link>
          </li>
        ))}
      </ul> */}
    </div>
  )
}
