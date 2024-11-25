import React from "react";
import { Link, useLocation } from "react-router-dom";
import appConfig from "../../configs/appConfig";
import { useAuth } from "../../context/AuthContext";

const UserLayout = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();

    // Define routes where the navigation bar should not appear
    const noNavRoutes = ["/login", "/register"];
    const shouldHideNav = noNavRoutes.includes(location.pathname);

    return (
        <div>
            {/* Render navigation only if the current route is not in `noNavRoutes` */}
            {!shouldHideNav && (
                <nav className="py-4 fixed top-0 left-0 right-0 z-50 bg-gradient-to-l from-blue-500 to-indigo-900 text-white shadow-xl h-16">
                    <div className="px-2 mx-auto flex justify-between items-center">
                        <h1 className="text-lg md:text-xl xl:text-2xl font-bold">
                            <Link to={'/'}>{appConfig.Name}</Link>
                        </h1>
                        {user ? (
                            <Link to="/profile" className="hover:underline">Profile</Link>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="hover:underline">Login</Link>
                                <Link to="/register" className="hover:underline">Register</Link>
                            </div>
                        )}
                    </div>
                </nav>
            )}

            {/* Main Content */}
            <main className={`${shouldHideNav ? '' : 'pt-16'}`}>
                {children}
            </main>

            {/* Footer */}
            {!shouldHideNav && (
                // <footer className="bg-gray-800 text-gray-300 py-6 text-center">
                //     <p>© 2024 {appConfig?.Name}. All rights reserved.</p>
                // </footer>
                <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} {appConfig?.Name}. All Rights Reserved.</p>
                    <p className="mt-4">
                        <Link to="#" className="text-blue-400 hover:underline">Privacy Policy</Link> | 
                        <Link to="#" className="text-blue-400 hover:underline ml-2">Terms of Service</Link> | 
                        <Link to="/admin" className="text-blue-400 hover:underline ml-2">Admin ?</Link>
                    </p>
                </div>
            </footer>
            )}
        </div>
    );
};

export default UserLayout;
