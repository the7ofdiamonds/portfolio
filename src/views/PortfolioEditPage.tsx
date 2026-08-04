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
    const [projects, setProjects] = useState<Set<Project>>(portfolio?.projects ?? new Set());
    const instruction = "Choose the project you would like to update.";

    const [message, setMessage] = useState<string | null>(instruction);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    const {
        portfolioLoading,
        portfolioErrorMessage
    } = useAppSelector((state) => state.portfolio);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (portfolio?.size > 0 && portfolio.projects) {
            setProjects(portfolio.projects);
        }
    }, [portfolio?.size]);

    useEffect(() => {
        if (portfolioLoading) {
            setMessageType('info');
            setMessage('Now Loading Portfolio');
            setShowStatusBar('show');
        }
    }, [portfolioLoading]);

    useEffect(() => {
        if (!portfolioLoading) {
            setMessage(instruction);
        }
    }, [portfolioLoading]);

    useEffect(() => {
        if (portfolioErrorMessage) {
            setMessage(portfolioErrorMessage);
            setMessageType('error');
            setShowStatusBar('show');
        }
    }, [portfolioErrorMessage]);

    return (
        <Section>
            <>
                <h1 className='title'>edit portfolio</h1>

                {message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}

                {projects.size > 0 && (
                    Array.from(projects).map((project, index) => (
                        <EditPortfolioProject key={index} project={project} useAppDispatch={useAppDispatch} useAppSelector={useAppSelector} />
                    ))
                )}
            </>
        </Section>
    )
}