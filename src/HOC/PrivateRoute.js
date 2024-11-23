import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Props:
// - children: The component to render if authorized
// - requiredRole: (optional) The role required to access the route
export default function PrivateRoute({ children, requiredRole }) {
    const { user } = useAuth();

    if (!user) {
        // User is not authenticated
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // User does not have the required role
        return <Navigate to="/" replace />;
    }

    // User is authenticated and has the required role (if any)
    return children;
}