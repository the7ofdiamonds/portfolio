import React, { useEffect, useState } from 'react';

import { Section } from '@the7ofdiamonds/ui-ux';
import { Portfolio, Project, User } from '@the7ofdiamonds/ui-ux';

import { EditPortfolioProject } from '@/views/components/edit/EditPortfolioProject';

interface PortfolioEditPageProps {
    user: User;
}

export const PortfolioEditPage: React.FC<PortfolioEditPageProps> = ({ user }) => {
    const [portfolio, setPortfolio] = useState<Portfolio | null>(user.portfolio);
    const [projects, setProjects] = useState<Set<Project>>(portfolio && portfolio.projects ? portfolio.projects : new Set);

    useEffect(() => {
        if (user.portfolio) {
            setPortfolio(user.portfolio);
        }
    }, [user]);

    useEffect(() => {
        if (portfolio && portfolio.projects) {
            setProjects(portfolio.projects);
        }
    }, [portfolio]);

    return (
        <Section>
            {projects.size > 0 && (
                Array.from(projects).map((project, index) => (
                    <EditPortfolioProject key={index} project={project} />
                ))
            )}
        </Section>
    )
}