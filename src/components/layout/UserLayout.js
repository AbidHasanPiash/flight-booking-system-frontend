import React from "react";
import { Link, useLocation } from "react-router-dom";
import appConfig from "../../configs/appConfig";

const UserLayout = ({ children }) => {
  const location = useLocation();

  // Define routes where the navigation bar should not appear
  const noNavRoutes = ["/login", "/register", "/admin"];
  const shouldHideNav = noNavRoutes.includes(location.pathname);

  return (
    <div>
      {/* Render navigation only if the current route is not in `noNavRoutes` */}
      {!shouldHideNav && (
        <nav className="py-4 fixed top-0 left-0 right-0 bg-gray-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-lg md:text-xl xl:text-2xl font-bold">{appConfig.Name}</h1>
            <div className="space-x-4">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
