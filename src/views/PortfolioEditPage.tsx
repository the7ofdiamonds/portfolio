import React, { useEffect, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Project, User } from '@the7ofdiamonds/ui-ux';

import { EditPortfolioProject } from '../views/components/edit/EditPortfolioProject';

import type { AppDispatch, RootState } from '../../../model/store';

interface PortfolioEditPageProps {
    portfolio: Portfolio;
    useAppDispatch: () => AppDispatch;
    useAppSelector: TypedUseSelectorHook<RootState>;
}

export const PortfolioEditPage: React.FC<PortfolioEditPageProps> = ({ portfolio, useAppDispatch, useAppSelector }) => {
    const [projects, setProjects] = useState<Set<Project>>(new Set());

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    useEffect(() => {
        if (portfolio && portfolio.projects) {
            setProjects(portfolio.projects);
        }
    }, [portfolio]);

    return (
        <Section>
            {projects.size > 0 && (
                Array.from(projects).map((project, index) => (
                    <EditPortfolioProject key={index} project={project} useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
                ))
            )}

            {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}