import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { OrganizationComponent } from '@/views/components/organization/OrganizationComponent';
import { PortfolioComponent } from '@/views/components/portfolio/PortfolioComponent';

import { ContactBar } from '@/views/components/ContactBar';

import { getOrganization } from '@/controllers/organizationSlice';

import { useAppDispatch, useAppSelector } from '@/model/hooks';
import { Organization } from '@/model/Organization';
import { Portfolio } from '@/model/Portfolio';
import { Skills } from '@/model/Skills';

import styles from '@/views/components/organization/Organization.module.scss';

export const OrganizationPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { login } = useParams<string>();

    const { organizationObject } = useAppSelector(
        (state) => state.organization);

    const [organization, setOrganization] = useState<Organization | null>(null);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [skills, setSkills] = useState<Skills | null>(null);

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

    useEffect(() => {
        if (organization && organization.portfolio) {
            setPortfolio(organization.portfolio)
        }
    }, [organization?.portfolio]);

    useEffect(() => {
        if (organization && organization.skills) {
            setSkills(organization.skills)
        }
    }, [organization?.skills]);

    return (
        <section className={styles.section} id='top'>
            <>
                {organization && <OrganizationComponent organization={organization} />}

                {organization && organization.contactMethods && <ContactBar contactMethods={organization.contactMethods} location='' />}

                {organization && <PortfolioComponent portfolio={portfolio} skills={skills} />}
            </>
        </section>
    )
}