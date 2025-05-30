import React, { useEffect, useState } from 'react'

import { IconComponent } from './IconComponent';

import { ProjectURL } from '@/model/ProjectURL';

interface ButtonIconExternalProps {
    buttonProps: ProjectURL;
}

const ButtonIconExternal: React.FC<ButtonIconExternalProps> = ({ buttonProps }) => {
    const [url, setUrl] = useState<URL>();

    useEffect(() => {
        if (buttonProps.url) {
            try {
                setUrl(new URL(buttonProps.url));
            } catch (error) {
                const err = error as Error;
                console.error(err.message);
            }
        }
    }, []);

    return (
        <>
            {url &&
                <button
                    onClick={() => window.open(url, '_blank')}
                    title={buttonProps.description}>
                    <IconComponent imageClass={buttonProps.image} />
                    <h3>{`${buttonProps.name}`}</h3>
                </button>
            }
        </>
    )
}

export default ButtonIconExternal