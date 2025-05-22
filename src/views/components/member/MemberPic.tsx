import React, { useEffect, useState } from 'react'

import { User } from '@/model/User';
import { Contributor } from '@/model/Contributor';

interface MemberPicProps {
    user: User | Contributor | null;
}

const MemberPic: React.FC<MemberPicProps> = ({ user }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.avatarURL) {
            setAvatarURL(user.avatarURL)
        }
    }, [user]);

    return (avatarURL &&
        <div className="author-pic">
            <img src={avatarURL} alt="" />
        </div>
    )
}

export default MemberPic