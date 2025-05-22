import React from 'react'

import { FeaturesRoadmap } from '@/model/FeaturesRoadmap';

interface RoadmapProps {
    roadmap: FeaturesRoadmap;
}

const RoadmapComponent: React.FC<RoadmapProps> = ({ roadmap }) => {
    return (
        <>
            {roadmap.path && roadmap.path.length > 0 &&
                <div className='roadmap'>
                    <h4 className='title'>Roadmap</h4>

                    {roadmap.path.map((feature) => (
                        <div className='feature' key={feature.id}>
                            <h3 className='feature-version'>
                                v{feature.version ? feature.version.toString() : '1.0.0'}
                            </h3>
                            <h3>-</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>}
        </>
    )
}

export default RoadmapComponent