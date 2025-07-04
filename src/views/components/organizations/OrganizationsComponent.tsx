import React from 'react'

import { Organizations } from '@/model/Organizations';
import { Organization } from '@/model/Organization';

import { DescriptionComponent } from '@/views/components/description/DescriptionComponent';

import styles from './Organizations.module.scss';

interface OrganizationsComponentProps {
  organizations: Organizations;
}

export const OrganizationsComponent: React.FC<OrganizationsComponentProps> = ({ organizations }) => {
  const { list } = organizations;

  const handleClick = (organization: Organization) => {
    handleOrganizations();
    window.location.href = `/organization/${organization.login}`;
  };

  const handleOrganizations = () => {
    const element = document.getElementById('top');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {Array.isArray(list) && list.length > 0 && (
        <div className={styles.organizations}>
          <h2 className={styles.title}>
            {list.length === 1
              ? 'Organization'
              : 'Organizations'}
          </h2>

          {list.map((organization, index) => (
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