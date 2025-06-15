import React from 'react'

import { Project } from '@/model/Project';

import { EditStatus } from '@/views/components/edit/process/EditStatus';
import { EditDesign } from '@/views/components/edit/process/EditDesign';
import { EditDevelopment } from '@/views/components/edit/process/EditDevelopment';
import { EditDelivery } from '@/views/components/edit/process/EditDelivery';

import { StatusBarComponent } from '@/views/components/status_bar/StatusBarComponent';

import styles from './EditProcess.module.scss';

interface EditProcessProps {
    project: Project;
    change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditProcess: React.FC<EditProcessProps> = ({ project, change }) => {
    return (
        <div className={styles.edit} id='edit_process'>
            <h1 className={styles.title}>process</h1>

            <EditStatus project={project} />

            <br />

            <EditDesign project={project} change={change} />

            <br />

            <EditDevelopment project={project} change={change} />

            <br />

            <EditDelivery project={project} change={change} />

            <br />

            <button className={styles.button} onClick={change(project)}>
                <h3>SAVE PROCESS</h3>
            </button>

            <StatusBarComponent />
        </div>
    )
}