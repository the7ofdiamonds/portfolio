import React, { useEffect, useState } from 'react'

import { Account } from '@/model/Account';
import { Contributor } from '@/model/Contributor';

import styles from './Member.module.scss';

interface MemberPicProps {
    account: Account | Contributor | null;
}

const MemberPic: React.FC<MemberPicProps> = ({ account }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);

    useEffect(() => {
        if (account && account.avatarURL) {
            setAvatarURL(account.avatarURL)
        }
    }, [account]);

    return (avatarURL &&
        <div className={styles['author-pic']}>
            <img src={avatarURL} alt="" />
        </div>
    )
}

export default MemberPic