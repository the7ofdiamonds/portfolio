import React, { useEffect, useState } from 'react'

import { Project } from '@/model/Project';

interface OwnerComponentProps {
    project: Project;
}

const OwnerComponent: React.FC<OwnerComponentProps> = ({ project }) => {
    const [type, setType] = useState<string | null>(null);
    const [login, setLogin] = useState<string | null>(null);
    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => { if (project?.owner?.type) { setType(project.owner.type.toLowerCase()) } }, [project?.owner]);

    useEffect(() => { if (project?.owner?.login) { setLogin(project.owner.login) } }, [project?.owner]);

    useEffect(() => { if (project?.owner?.avatarURL) { setAvatarURL(project.owner.avatarURL) } }, [project?.owner]);

    useEffect(() => {
        if (project.owner.type === 'User') {
            setName(project.owner.name)
        } else if (project.owner.type === 'Organization') {
            setName(project.owner.company ? project.owner.company : project.owner.name)
        }
    }, [project?.owner]);

    const handleClick = () => {
        window.location.href = `/#/${type}/${login}`;
    };

    return (
        <>
            {avatarURL && name &&
                <div className="project-owner">
                    <h2 className="title">project owner</h2>

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

export default OwnerComponent