import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { getAuthorization } from '@/services/Config';

import { LoginComponent } from './components/LoginComponent';

import { setIsAdmin, setIsAuthenticated } from '@/controllers/authSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { isAdmin, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const auth = getAuthorization();
        if (auth) {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setIsAuthenticated();
                    setIsAdmin();
                } else {
                    console.log('User logged out');
                }
            });

            return () => unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [navigate, isAuthenticated, isAdmin]);

    return (
        <section className='login'>
            <main>
                <LoginComponent />
            </main>
        </section>
    )
}