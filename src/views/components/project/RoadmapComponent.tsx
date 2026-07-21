import React, { useState, useEffect } from 'react';

import { FeaturesRoadmap } from '@the7ofdiamonds/ui-ux';

import styles from './Project.module.scss';

interface RoadmapProps {
    roadmap: FeaturesRoadmap;
}

export const RoadmapComponent: React.FC<RoadmapProps> = ({ roadmap }) => {
    const [path, setPath] = useState<Array<String>>([]);

    useEffect(() => {
        if (roadmap && roadmap.display()) {
            setPath(roadmap.display());
        }
    }, [roadmap]);

    return (
        <>
            {path && path.length > 0 &&
                <div className={styles.roadmap}>
                    <h4 className={styles.title}>Roadmap</h4>

                    {path.map((feature) => (
                        <div className={styles.feature} key={feature.id}>
                            <h5 className={styles['feature-version']}>
                                {`v${feature.version}`}
                            </h5>
                            <h5>-</h5>
                            <h5>{feature.description}</h5>
                        </div>
                    ))}
                </div>}
        </>
    )
}