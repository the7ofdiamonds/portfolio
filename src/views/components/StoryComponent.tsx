import React from 'react'

import ContentComponent from './content/ContentComponent';

import { ContentURL } from '@/model/ContentURL';

interface StoryComponentProps {
    story: ContentURL;
}

const StoryComponent: React.FC<StoryComponentProps> = ({ story }) => {
    return (<>{
        story &&
        <div className="story" id="story">
            <h2 className="title">story</h2>

            <ContentComponent title={null} content={story} />
        </div>
    }</>)
}

export default StoryComponent