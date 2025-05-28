import React from 'react'

import { Project } from '@/model/Project';

import { EditStatus } from '@/views/components/edit/process/EditStatus';
import { EditDesign } from '@/views/components/edit/process/EditDesign';
import { EditDevelopment } from '@/views/components/edit/process/EditDevelopment';
import { EditDelivery } from '@/views/components/edit/process/EditDelivery';

import { StatusBarComponent } from '@/views/components/StatusBarComponent';

interface EditProcessProps {
    project: Project;
    change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditProcess: React.FC<EditProcessProps> = ({ project, change }) => {
    return (
        <div className='update' id='update_process'>
            <h1 className='title'>process</h1>

            <EditStatus project={project} />

            <br />

            <EditDesign project={project} change={change} />

            <br />

            <EditDevelopment project={project} change={change} />

            <br />

            <EditDelivery project={project} change={change} />

            <br />

            <button onClick={change(project)}>
                <h3>SAVE PROCESS</h3>
            </button>

            <StatusBarComponent />
        </div>
    )
}