import React, { useState } from 'react'

import type { MessageType, StatusBarVisibility } from '@the7ofdiamonds/ui-ux';
import { StatusBar } from '@the7ofdiamonds/ui-ux';
import { ProjectProcess, ProjectStatus, ProjectDesign, ProjectDevelopment, ProjectDelivery } from '@the7ofdiamonds/ui-ux';

import { EditStatus } from '../../../../views/components/edit/process/EditStatus';
import { EditDesign } from '../../../../views/components/edit/process/EditDesign';
import { EditDevelopment } from '../../../../views/components/edit/process/EditDevelopment';
import { EditDelivery } from '../../../../views/components/edit/process/EditDelivery';

import styles from './EditProcess.module.scss';

interface EditProcessProps {
    id: string | number | null;
    process: ProjectProcess;
    setProcess: React.Dispatch<React.SetStateAction<ProjectProcess>>;
}

export const EditProcess: React.FC<EditProcessProps> = ({ id, process, setProcess }) => {
    const instruction = "Save updates made to the project process.";

    const [show, setShow] = useState<StatusBarVisibility>('hide');
    const [message, setMessage] = useState<string>(instruction);
    const [messageType, setMessageType] = useState<MessageType>('info');

    const [status, setStatus] = useState<ProjectStatus | null>(process?.status ?? new ProjectStatus());
    const [design, setDesign] = useState<ProjectDesign | null>(process?.design ?? new ProjectDesign());
    const [development, setDevelopment] = useState<ProjectDevelopment | null>(process?.development ?? new ProjectDevelopment());
    const [delivery, setDelivery] = useState<ProjectDelivery | null>(process?.delivery ?? new ProjectDelivery());

    const saveProcess = () => {
        try {
            let hasData = false;

            if (status) {
                status.setID(id)
                process.setStatus(status);
                hasData = true;
            }

            if (design) {
                design.setID(id)
                process.setDesign(design);
                hasData = true;
            }

            if (development) {
                development.setID(id)
                process.setDevelopment(development);
                hasData = true;
            }

            if (delivery) {
                delivery.setID(id)
                process.setDelivery(delivery);
                hasData = true;
            }

            if (hasData) {
                if (!process.id) process.setID(id)
            }
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
                <EditStatus status={status} setStatus={setStatus}/>

                <br />

                <EditDesign id={id} design={design} setDesign={setDesign}/>

                <br />

                <EditDevelopment id={id} development={development} setDevelopment={setDevelopment}/>

                <br />

                <EditDelivery id={id} delivery={delivery} setStatus={setDelivery}/>

                <StatusBar show={show} messageType={messageType} message={message} />

                <button className={styles.button} onClick={saveProcess}>
                    <h3>SAVE PROCESS</h3>
                </button>
            </div>
        </details>
    )
}