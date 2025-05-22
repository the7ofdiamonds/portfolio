import React from 'react'

interface MemberBioProps {
    bio: string;
}

const MemberBio: React.FC<MemberBioProps> = ({ bio }) => {
    return (
        <>
            {bio !== '' && (
                <div className="author-bio-card card">
                    <h3 className="author-bio">
                        <q>{bio}</q>
                    </h3>
                </div>
            )}
        </>)
}

export default MemberBio