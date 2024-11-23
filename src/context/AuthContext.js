import React, { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null indicates no user is logged in
    const [loading, setLoading] = useState(true); // Indicates if the auth state is being initialized

    // Function to log in a user
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Function to log out a user
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Auth state has been initialized
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use Auth Context
export function useAuth() {
    return useContext(AuthContext);
}