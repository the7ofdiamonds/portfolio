import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Section, StatusBar } from '@the7ofdiamonds/ui-ux';
import { Organizations, Organization, Portfolio, Skills } from '@the7ofdiamonds/ui-ux';
import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { ContactMethods } from '@the7ofdiamonds/ui-ux';
import { ContactBar } from '@the7ofdiamonds/communications';

import { OrganizationComponent } from '../views/components/organization/OrganizationComponent';
import { PortfolioComponent } from '../views/components/portfolio/PortfolioComponent';

import { getOrganization } from '../controllers/organizationSlice';

import { useAppDispatch, useAppSelector } from '../model/hooks';

export interface OrganizationPageProps {
    organizations: Organizations | null;
}

export const OrganizationPage: React.FC<OrganizationPageProps> = ({ organizations }) => {
    const dispatch = useAppDispatch();

    const { login } = useParams<string>();

    const { organizationObject } = useAppSelector(
        (state) => state.organization);

    const [organization, setOrganization] = useState<Organization | null>(null);
    const [contactMethods, setContactMethods] = useState<ContactMethods | null>();
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>('info');
    const [showStatusBar, setShowStatusBar] = useState<StatusBarVisibility>('hide');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [login]);

    useEffect(() => {
        if (organizations?.list && organizations?.list.length > 0) {
            setOrganization(organizations.filterOrganizationsByLogin(login));
        }
    }, [organizations?.list]);

    // useEffect(() => {
    //     if (!organizationObject && login) {
    //         dispatch(getOrganization(login));
    //     }
    // }, [organization?.login, login, organizationObject]);

    // useEffect(() => {
    //     if (organizationObject) {
    //         setOrg(new Organization(organizationObject));
    //     }
    // }, [organizationObject]);

    useEffect(() => {
        if (organization?.contactMethods) {
            setContactMethods(organization.contactMethods)
        }
    }, [organization?.contactMethods]);

    useEffect(() => {
        if (organization?.name) {
            document.title = organization.name
        }
    }, [organization?.name]);

    useEffect(() => {
        if (organization?.portfolio) {
            setPortfolio(organization.portfolio)
        }
    }, [organization?.portfolio]);

    return (
        <Section>
            {organization && <OrganizationComponent organization={organization} />}

            {contactMethods && <ContactBar contactMethods={contactMethods} location='' />}

            {portfolio && <PortfolioComponent portfolio={portfolio} />}

            {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
        </Section>
    )
}