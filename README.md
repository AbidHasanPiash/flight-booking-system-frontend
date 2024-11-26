# Flight Booking System Frontend

This project is the frontend of the **Flight Booking System**, a MERN stack web application that allows users to search for flights, view available options, and make bookings. This React application connects to the backend API for data retrieval and user authentication.

---

## Features

- **Responsive Design**: Optimized for desktop and mobile views.
- **User Authentication**: Login, registration, and protected routes.
- **Flight Search**: Search flights by origin, destination, and date.
- **Booking Management**: Allows users to view and manage bookings.
- **Admin Dashboard**: For administrators to manage flights and bookings.

---

## Prerequisites

Before running this project, make sure you have the following installed on your system:

- Node.js (version 20.x or later)
- npm (Node Package Manager)
- A backend API for the Flight Booking System (see the backend repository for details)

---

## Installation

Follow these steps to set up and run the backend:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AbidHasanPiash/flight-booking-system-frontend.git
   cd flight-booking-system-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and configure it using the template provided in `.env.example`.

   Example `.env.development` file:
   ```env
    ####################################################
    # APPLICATION ENVIRONMENT
    # Purpose: Defines the operating mode of the application (development, test, production).
    # Use: Toggle features or behaviors based on the application environment.
    ####################################################
    NODE_ENV=development

    ####################################################
    # SERVER CONFIGURATION
    # Purpose: Contains settings pertinent to the application server, such as port and API version.
    # Use: Facilitate running the server with environment-specific configurations.
    ####################################################
    REACT_APP_BASE_URL=http://localhost:5000
    REACT_APP_PREFIX=api
   ```

4. **Start the Server**:
   - Development Mode:
     ```bash
     npm run start
     ```
   - Production Mode:
     ```bash
     npm start
     ```

- **Environment Variables**:
  Set the environment variables from `.env` on the respective deployment platform.

## Author

- **Name**: [ABID HASAN](https://abidhasan.vercel.app/)
- **Email**: [mp.abidhasan@gmail.com](mailto:mp.abidhasan@gmail.com)
- **Mobile**: [+8801789507895](tel:+8801789507895)
- **LinkedIn**: [linkedin.com/in/abidhasanpiash](https://www.linkedin.com/in/abidhasanpiash/)
- **GitHub**: [github.com/AbidHasanPiash](https://github.com/AbidHasanPiash)

---

## Additional Notes

- For advanced features like flight filtering, booking cancellation, and pagination, refer to the detailed [Project Instructions](#).
- The `.env.example` file serves as a reference for required environment variables. Ensure to replace placeholders with actual values.
