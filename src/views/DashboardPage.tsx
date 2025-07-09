import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Section, Button } from '@the7ofdiamonds/ui-ux';

import { logout } from '@the7ofdiamonds/gateway';

import { checkHeaders } from '@/utilities/Headers';

import { User } from '@/model/User';
import { useAppDispatch } from '@/model/hooks';

import styles from '@/views/components/dashboard/Dashboard.module.scss';

// interface DashboardPageProps {
//     user: User;
// }

export const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (!checkHeaders()) {
            navigate('/login');
        }
    }, []);

    const handleSkillAdd = () => {
        navigate('/admin/add/skill');
    };

    const handleUpdateProject = () => {
        navigate('/admin/update/portfolio');
    };

    const handleLogout = async () => {
        try {
            dispatch(logout());

            window.location.href = '/';
        } catch (error) {
            const err = error as Error;

            setMessage(`Logout error: ${err.message}`);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    return (
        <Section>
            <h2 className={styles.title}>Dashboard</h2>

            <div className={styles.options}>
                <Button title={'add skill'} action={handleSkillAdd} />

                <Button title={'update projects'} action={handleUpdateProject} />
            </div>

            <Button title={'logout'} action={handleLogout} />
        </Section>
    )
}