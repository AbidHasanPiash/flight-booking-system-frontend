import './App.css'
import './index.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import FlightDetails from "./pages/FlightDetails";
import Booking from "./pages/Booking";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserLayout from './components/layout/UserLayout';
import PrivateRoute from './HOC/PrivateRoute';

function App() {
    return (
        <Router>
            <UserLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/flights" element={<SearchResults />} />
                    <Route path="/flight/:id" element={<FlightDetails />} />
                    <Route path="/booking" element={<Booking />} />
                    {/* Protect /profile route for authenticated users */}
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    />
                    {/* Protect /admin route for admin users */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute requiredRole="admin">
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </UserLayout>
        </Router>
    );
}

export default App;
