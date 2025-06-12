import React from 'react'

import styles from './Member.module.scss';

interface MemberBioProps {
    bio: string;
}

export const MemberBio: React.FC<MemberBioProps> = ({ bio }) => {
    return (
        <>
            {bio !== '' && (
                <div className={`${styles['author-bio-card']} ${styles.card}`}>
                    <h3 className={styles['author-bio']}>
                        <q>{bio}</q>
                    </h3>
                </div>
            )}
        </>)
}