import React, { useEffect, useState } from 'react'

import { User } from '@/model/User';

interface MemberPicProps {
    user: User;
}

const MemberPic: React.FC<MemberPicProps> = ({ user }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);

    useEffect(() => {
        if (user?.avatarURL) {
            setAvatarURL(user.avatarURL)
        }
    }, [user]);

    return (
        <div className="user-pic">
            {avatarURL && <img src={avatarURL} alt="" />}
        </div>
    )
}

export default MemberPic