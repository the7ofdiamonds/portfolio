import React from 'react'

import { ButtonImage, Image } from '@the7ofdiamonds/ui-ux';


import svg from '../../assets/images/github-mark.svg';

interface ButtonGitHubProps {
    url: string | null;
}

export const ButtonGitHub: React.FC<ButtonGitHubProps> = ({ url }) => {
    const image = new Image({ id: 'github', title: 'GitHub', url: svg, class_name: 'github-svg' });

    return (
        <ButtonImage action={() => window.open(url, "_blank", "noopener,noreferrer")} description={'Go to Repo'} image={image} title={'Login with GitHub'} />
    )
}