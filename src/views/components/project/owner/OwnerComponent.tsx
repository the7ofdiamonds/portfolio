import React, { useEffect, useState } from 'react'

import { Owner } from '@the7ofdiamonds/ui-ux';

import styles from './Owner.module.scss';

interface OwnerComponentProps {
    owner: Owner;
}

export const OwnerComponent: React.FC<OwnerComponentProps> = ({ owner }) => {
    const [type, setType] = useState<string | null>(null);
    const [login, setLogin] = useState<string | null>(null);
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => { if (owner?.type) { setType(owner.type.toLowerCase()) } }, [owner?.type]);

    useEffect(() => { if (owner?.login) { setLogin(owner.login) } }, [owner?.login]);

    useEffect(() => { if (owner?.avatarURL) { setAvatarURL(owner.avatarURL) } }, [owner?.avatarURL]);

    useEffect(() => {
        if (owner?.type === 'User') {
            setName(owner.name)
        } else if (owner.type === 'Organization' && (owner?.company || owner?.name)) {
            setName(owner?.company ? owner.company : owner.name)
        }
    }, [owner]);

    const handleClick = () => {
        window.location.href = `/${type}/${login}`;
    };

    return (
        <>
            {avatarURL && name &&
                <div className={styles['project-owner']}>
                    <h2 className={styles.title}>project owner</h2>

                    <button
                        className="organizations-button"
                        onClick={handleClick}>
                        {avatarURL && <img
                            src={avatarURL}
                            alt={`${name} avatar`}
                        />}
                    </button>
                    <h3>{name}</h3>
                </div>
            }
        </>
    )
}