import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ApiService from './apiService.ts';

interface ProtectedRouteProps {
    element: ComponentType<any>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element }) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        <Element />
    ) : (
        <Navigate to={'/auth/login'} replace state={{ from: location }} />
    );
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ element: Element }) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        <Element />
    ) : (
        <Navigate to={'/auth/login'} replace state={{ from: location }} />
    );
};

export const TeacherRoute: React.FC<ProtectedRouteProps> = ({ element: Element }) => {
    const location = useLocation();

    return ApiService.isTeacher() ? (
        <Element />
    ) : (
        <Navigate to={'/auth/login'} replace state={{ from: location }} />
    );
};
