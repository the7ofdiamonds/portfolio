import React, { useEffect, useState } from 'react'

import { Organization } from '@/model/Organization'

import { DescriptionComponent } from './DescriptionComponent';

interface HeaderOrganizationComponentProps {
    organization: Organization;
}

export const OrganizationComponent: React.FC<HeaderOrganizationComponentProps> = ({ organization }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    useEffect(() => {
        if (organization.avatarURL) {
            setAvatarURL(organization.avatarURL)
        }
    }, [organization]);

    useEffect(() => {
        if (organization.name) {
            setName(organization.name)
        }
    }, [organization]);

    useEffect(() => {
        if (organization.description) {
            setDescription(organization.description)
        }
    }, [organization]);

    return (
        <div className='organization organization-header'>
            {avatarURL && <img
                src={avatarURL}
                alt={`${name} avatar`}
            />}
            {name && <h2 className='title'>{name}</h2>}
            {description && <DescriptionComponent description={description} />}
        </div>
    )
}