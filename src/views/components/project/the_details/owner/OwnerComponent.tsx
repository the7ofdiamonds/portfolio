import React, { useEffect, useState } from 'react'

import { Organization, Owner, User } from '@the7ofdiamonds/ui-ux';
import { UserCard } from '@the7ofdiamonds/communications';

import styles from './Owner.module.scss';

interface OwnerComponentProps {
    account: Organization | User;
    owner: Owner;
}

export const OwnerComponent: React.FC<OwnerComponentProps> = ({ account, owner }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (account?.login === owner?.login) {
            setUser(account)
        } else if (owner?.type && owner?.avatarURL && (owner?.login || owner.name)) {
            setUser(owner.toAccount())
        }
    }, [owner?.type]);

    return (
        <>
            {user &&
                <div className={styles['project-owner']}>
                    <h4 className={styles.title}>project owner</h4>

                    <UserCard user={user} account={account} />
                </div>
            }
        </>
    )
}