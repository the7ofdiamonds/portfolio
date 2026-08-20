import React, { useEffect, useState } from 'react'

import { Owner, User } from '@the7ofdiamonds/ui-ux';
import { UserCard } from '@the7ofdiamonds/communications';

import styles from './Owner.module.scss';

interface OwnerComponentProps {
    owner: Owner;
}

export const OwnerComponent: React.FC<OwnerComponentProps> = ({ owner }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (owner?.type && owner?.avatarURL && (owner?.login || owner.name)) {
            setUser(owner.toAccount())
        }
    }, [owner?.type]);

    return (
        <>
            {user &&
                <div className={styles['project-owner']}>
                    <h2 className={styles.title}>project owner</h2>

                    <UserCard user={user} />
                </div>
            }
        </>
    )
}