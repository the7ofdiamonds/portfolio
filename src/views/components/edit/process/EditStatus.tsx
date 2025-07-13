import React, { useEffect, useState } from 'react';

import {
    CheckList,
    Project,
    ProjectCheckList,
    ProjectProcess,
    ProjectProgress,
    ProjectStatus
} from '@the7ofdiamonds/ui-ux';

import Status from '@/views/components/project/Status';

interface EditStatusProps {
    project: Project;
}

export const EditStatus: React.FC<EditStatusProps> = ({ project }) => {
    const [designCheckList, setDesignCheckList] = useState<CheckList | null>(null)
    const [developmentCheckList, setDevelopmentCheckList] = useState<CheckList | null>(null)
    const [deliveryCheckList, setDeliveryCheckList] = useState<CheckList | null>(null)
    const [checkList, setCheckList] = useState<ProjectCheckList | null>(null);
    const [progress, setProgress] = useState<ProjectProgress | null>(null);

    useEffect(() => {
        if (project.process?.design?.checkList) {
            setDesignCheckList(project.process.design.checkList)
        }
    }, [project.process?.design?.checkList]);

    useEffect(() => {
        if (project.process?.development?.checkList) {
            setDevelopmentCheckList(project.process.development.checkList)
        }
    }, [project.process?.development?.checkList]);

    useEffect(() => {
        if (project.process?.delivery?.checkList) {
            setDeliveryCheckList(project.process.delivery.checkList)
        }
    }, [project.process?.delivery?.checkList]);

    useEffect(() => {
        if (designCheckList || developmentCheckList || deliveryCheckList) {
            setCheckList(new ProjectCheckList(
                {
                    design_check_list: designCheckList ? designCheckList.toCheckListObject() : null,
                    development_check_list: developmentCheckList ? developmentCheckList.toCheckListObject() : null,
                    delivery_check_list: deliveryCheckList ? deliveryCheckList.toCheckListObject() : null
                }
            ))
        }
    }, [designCheckList, developmentCheckList, deliveryCheckList]);

    useEffect(() => {
        if (checkList) {
            setProgress(new ProjectProgress(checkList));
        }
    }, [checkList]);

    useEffect(() => {
        if (progress) {
            if (project.process && project.process.status) {
                project.process.status.setProgress(progress)
            } else {
                const projectStatus = new ProjectStatus();
                projectStatus.setProgress(progress)
                const projectProcess = new ProjectProcess();
                projectProcess.setStatus(projectStatus)
                project.setProcess(projectProcess)
            }
        }
    }, [progress]);

    return (
        <>
            {project.process && project.process.status && <Status status={project.process.status} />}
        </>
    )
}