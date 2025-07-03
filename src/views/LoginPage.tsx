import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { LoginComponent } from '@the7ofdiamonds/gateway';

import { Section, Main } from '@the7ofdiamonds/ui-ux';

import { getAuthorization } from '@/services/Config';

import { setIsAdmin, setIsAuthenticated } from '@/controllers/authSlice';

import { useAppSelector } from '@/model/hooks';

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
    }, [isAuthenticated, isAdmin]);

    return (
        <Section>
            <Main>
                <LoginComponent />
            </Main>
        </Section>
    )
}