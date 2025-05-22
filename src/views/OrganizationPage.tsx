import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';
import { OrganizationComponent } from '@/views/components/OrganizationComponent';
import { ContactBar } from '@/views/components/ContactBar';

import { getOrganization } from '@/controllers/organizationSlice';

import type { AppDispatch, RootState } from '@/model/store';
import { Organization } from '@/model/Organization';

export const OrganizationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { login } = useParams<string>();

    const { organizationObject } = useSelector(
        (state: RootState) => state.organization);

    const [organization, setOrganization] = useState<Organization | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [login]);

    useEffect(() => {
        if (!organizationObject && login) {
            dispatch(getOrganization(login));
        }
    }, [login, organizationObject]);

    useEffect(() => {
        if (organizationObject) {
            setOrganization(new Organization(organizationObject));
        }
    }, [organizationObject]);

    useEffect(() => {
        if (organization && organization.name) {
            document.title = organization.name
        }
    }, [organization]);

    return (
        <section className='organization' id='top'>
            <>
                {organization && <OrganizationComponent organization={organization} />}

                {organization && organization.contactMethods && <ContactBar contactMethods={organization.contactMethods} location='' />}

                {organization && <PortfolioComponent account={organization} />}
            </>
        </section>
    )
}