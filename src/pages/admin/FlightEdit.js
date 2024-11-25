import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FlightForm from '../../components/form/FlightForm';
import { fetchData } from '../../utils/axios';
import apiConfig from '../../configs/apiConfig';
import Spinner from '../../components/common/Spinner';

export default function FlightEdit() {
    // Get the ID from the URL params
    const { id } = useParams();

    // Fetch flight data using the ID
    const { isLoading, data: flight, error } = useQuery({
        queryKey: ["flight", id],
        queryFn: () => fetchData(apiConfig.GET_FLIGHT_BY_ID + id), // Adjust API endpoint as needed
        enabled: !!id, // Ensure the query only runs when ID is available
    });

    if (isLoading) {
        return <div><Spinner size='4'/></div>;
    }

    if (error) {
        return <div>Error loading flight details: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Flight</h1>
            {/* Pass the flight data to the FlightForm */}
            <FlightForm flight={flight} />
        </div>
    );
}
