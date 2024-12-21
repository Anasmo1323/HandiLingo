import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ user, children }) => {
  console.log("User object:", user); // Log the user object

  if (Object.keys(user).length === 0) {
    console.log("You are getting navigated to login page");
    return <Navigate to="/login" />;
  }
  // Render the route if authenticated
  return children;
};

export default ProtectedRoute;