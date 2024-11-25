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
import EditProfile from './pages/EditProfile';
import AdminFlights from './pages/admin/AdminFlights';
import FlightCreate from './pages/admin/FlightCreate';
import FlightEdit from './pages/admin/FlightEdit';
import AdminBookings from './pages/admin/AdminBookings';
import AdminOverview from './pages/admin/AdminOverview';

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
                    <Route path="/profile" element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
                    <Route path="/profile/edit" element={<PrivateRoute> <EditProfile /> </PrivateRoute>} />

                    {/* Nested admin routes */}
                    <Route path="/admin" element={<PrivateRoute requiredRole="admin"> <AdminDashboard /> </PrivateRoute>}>
                        <Route index element={<AdminOverview />} />
                        <Route path="flights" element={<AdminFlights />} />
                        <Route path="flights/create" element={<FlightCreate />} />
                        <Route path="flights/edit/:id" element={<FlightEdit />} />
                        <Route path="bookings" element={<AdminBookings />} />
                    </Route>
                </Routes>
            </UserLayout>
        </Router>
    );
}

export default App;
