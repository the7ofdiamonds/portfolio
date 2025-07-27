import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { MessageType, StatusBarVisibility, ContactMethods } from '@the7ofdiamonds/ui-ux';
import { ContactBar } from '@the7ofdiamonds/communications';

import { OrganizationComponent } from '@/views/components/organization/OrganizationComponent';
import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';

import { getOrganization } from '@/controllers/organizationSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Organization, Portfolio, Skills } from '@the7ofdiamonds/ui-ux';

export interface OrganizationPageProps {
    organization: Organization | null;
    skills: Skills;
}

export const OrganizationPage: React.FC<OrganizationPageProps> = ({ organization, skills }) => {
    const dispatch = useAppDispatch();

    const { login } = useParams<string>();

    const { organizationObject } = useAppSelector(
        (state) => state.organization);

    const [org, setOrg] = useState<Organization | null>(null);
    const [orgContactMethods, setOrgContactMethods] = useState<ContactMethods | null>();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [orgSkills, setOrgSkills] = useState<Skills>(new Skills);

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [login]);

    useEffect(() => {
        if (organization?.login === login) {
            setOrg(organization);
        }
    }, [organization?.login]);

    useEffect(() => {
        if (!organizationObject && login) {
            dispatch(getOrganization(login));
        }
    }, [organization?.login, login, organizationObject]);

    useEffect(() => {
        if (organizationObject) {
            setOrg(new Organization(organizationObject));
        }
    }, [organizationObject]);

    useEffect(() => {
        if (organization?.login === `@${login}` && organization?.contactMethods) {
            setOrgContactMethods(organization.contactMethods)
        }
    }, [organization]);

    useEffect(() => {
        if (org?.name) {
            document.title = org.name
        }
    }, [org]);

    useEffect(() => {
        if (org && org.portfolio) {
            setPortfolio(org.portfolio)
        }
    }, [org?.portfolio]);

    useEffect(() => {
        if (organization && organization.skills && skills) {
            skills.list.push(...organization.skills.list)
            skills.getProjectTypesFromList()
            skills.getLanguagesFromList()
            skills.getFrameworksFromList()
            skills.getTechnologiesFromList()
            skills.getServicesFromList()
            setOrgSkills(skills)
        }
    }, [organization?.skills]);

    return (
        <Section>
            {org && <OrganizationComponent organization={org} />}

            {orgContactMethods && <ContactBar contactMethods={orgContactMethods} location='' />}

            {(portfolio || orgSkills) && <PortfolioComponent portfolio={portfolio} skills={orgSkills} />}

            {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}