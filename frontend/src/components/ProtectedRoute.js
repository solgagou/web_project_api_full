import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn }) => {
    return isLoggedIn ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;