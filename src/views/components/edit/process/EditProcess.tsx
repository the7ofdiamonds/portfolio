import React, { useState } from 'react'

import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { Project, ProjectProcess, ProjectStatus, ProjectDesign, ProjectDevelopment, ProjectDelivery } from '@the7ofdiamonds/ui-ux';

import { EditStatus } from '../../../../views/components/edit/process/EditStatus';
import { EditDesign } from '../../../../views/components/edit/process/EditDesign';
import { EditDevelopment } from '../../../../views/components/edit/process/EditDevelopment';
import { EditDelivery } from '../../../../views/components/edit/process/EditDelivery';

import styles from './EditProcess.module.scss';

interface EditProcessProps {
    project: Project;
    change: (project: Project) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditProcess: React.FC<EditProcessProps> = ({ project, change }) => {
    const process = project?.process ?? new ProjectProcess();
    const instruction = "Save updates made to the project process.";

    const [status, setStatus] = useState<ProjectStatus | null>(project?.process?.status ?? new ProjectStatus());
    const [design, setDesign] = useState<ProjectDesign | null>(project?.process?.design ?? new ProjectDesign());
    const [development, setDevelopment] = useState<ProjectDevelopment | null>(project?.process?.development ?? new ProjectDevelopment());
    const [delivery, setDelivery] = useState<ProjectDelivery | null>(project?.process?.delivery ?? new ProjectDelivery());

    const [show, setShow] = useState<StatusBarVisibility>('hide');
    const [message, setMessage] = useState<string>(instruction);
    const [messageType, setMessageType] = useState<MessageType>('info');

    const saveProcess = () => {
        try {
            let hasData = false;

            if (status) {
                status.setID(project?.id)
                process.setStatus(status);
                hasData = true;
            }

            if (design) {
                design.setID(project?.id)
                process.setDesign(design);
                hasData = true;
            }

            if (development) {
                development.setID(project?.id)
                process.setDevelopment(development);
                hasData = true;
            }

            if (delivery) {
                delivery.setID(project?.id)
                process.setDelivery(delivery);
                hasData = true;
            }

            if (hasData) {
                if (!process.id) process.setID(project?.id)
            } else {
                setMessage("No new project solution data to save.");
                setMessageType('caution');
                return;
            }

            if (!process.id) {
                throw new Error("An ID is required for project solution.")
            }

            project.setProcess(process)
            change(project)

            setMessage("Project process has been updated.");
            setMessageType('success');
        } catch (error) {
            const err = error as Error;
            setShow('show');
            setMessage(err.message);
            setMessageType('error');
        }
    };

    return (
        <details className={styles['edit-process']} id='edit_process'>
            <summary><h1 className={styles.title}>process</h1></summary>

            <div className={styles.edit}>
                <EditStatus project={project} />

                <br />

                <EditDesign project={project} change={change} />

                <br />

                <EditDevelopment project={project} change={change} />

                <br />

                <EditDelivery project={project} change={change} />

                <StatusBar show={show} messageType={messageType} message={message} />

                <button className={styles.button} onClick={saveProcess}>
                    <h3>SAVE PROCESS</h3>
                </button>
            </div>
        </details>
    )
}