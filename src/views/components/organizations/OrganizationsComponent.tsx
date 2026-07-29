import React from 'react'
import { useNavigate } from 'react-router-dom';

import { DescriptionComponent } from '@the7ofdiamonds/ui-ux';
import { Organization, Organizations } from '@the7ofdiamonds/ui-ux';

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
        <div className={styles.organizations}>
          <h2 className='title'>
            {organizations.list.length === 1
              ? 'Organization'
              : 'Organizations'}
          </h2>

          {organizations.list.map((organization, index) => (
            <div className={styles.organization} key={index}>
              <button
                key={index}
                className={styles['organizations-button']}
                onClick={() => handleClick(organization)}>
                {organization.avatarURL && <img
                  src={organization.avatarURL}
                  alt={`${organization.name} avatar`}
                />}
              </button>
              <h3>{organization.name}</h3>
              {organization.description && <DescriptionComponent description={organization.description} />}
            </div>
          ))}
        </div>
      )}
    </>
  )
}