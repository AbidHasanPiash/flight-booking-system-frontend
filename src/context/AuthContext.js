import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
    // Initialize user state
    const [user, setUser] = useState(null); // null indicates no user is logged in

    // Function to log in a user
    const login = (userData) => {
        setUser(userData);
        // Optionally, store user data in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Function to log out a user
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Load user from localStorage on initial render
    React.useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use Auth Context
export function useAuth() {
    return useContext(AuthContext);
}