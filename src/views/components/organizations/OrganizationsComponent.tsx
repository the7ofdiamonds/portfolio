import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Organization, Organizations } from '@the7ofdiamonds/ui-ux';
import { Main } from '@the7ofdiamonds/ui-ux';

import { OrganizationComponent } from '../organization/OrganizationComponent';

import styles from './Organizations.module.scss';

interface OrganizationsComponentProps {
  organizations: Organizations;
}

export const OrganizationsComponent: React.FC<OrganizationsComponentProps> = ({ organizations }) => {
  const navigate = useNavigate();

  const handleClick = (organization: Organization) => {
    handleOrganizations();
    if (organization?.website && !organization?.portfolio) {
      window.location.href = `${organization.website}`;
    } else {
      navigate(`/organization/${organization.login}`)
    }
  };

  const handleOrganizations = () => {
    const element = document.getElementById('top');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {Array.isArray(organizations?.list) && organizations.list.length > 0 && (
        <Main>
          <h2 className='title'>
            {organizations.list.length === 1
              ? 'Organization'
              : 'Organizations'}
          </h2>

          {organizations.list.map((organization, index) => (
            <button
              key={index}
              className={styles['organizations-button']}
              onClick={() => handleClick(organization)}>
              <OrganizationComponent organization={organization} />
            </button>
          ))}
        </Main>
      )}
    </>
  )
}