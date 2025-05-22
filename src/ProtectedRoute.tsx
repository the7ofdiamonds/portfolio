import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';

import { setIsAdmin, setIsAuthenticated } from './controllers/authSlice';
import { dispatch } from './model/hooks';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const {
        isAdmin
    } = useSelector((state: RootState) => state.auth);

    useEffect(()=>{
        dispatch(setIsAdmin())
    },[]);

    return isAdmin ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;