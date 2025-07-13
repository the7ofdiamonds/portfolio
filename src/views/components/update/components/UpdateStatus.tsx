import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    CheckList,
    Project,
    ProjectCheckList,
    ProjectProgress,
    ProjectStatus,
    ProjectStatusObject
} from '@the7ofdiamonds/ui-ux';

import Status from '../../project/Status';

import type { RootState } from '@/model/store';

interface UpdateStatusProps {
    project: Project;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ project }) => {
    const { updatedDesignCheckList, updatedDevelopmentCheckList, updatedDeliveryCheckList } = useSelector(
        (state: RootState) => state.update
    );

    const [designCheckList, setDesignCheckList] = useState<CheckList | null>(null)
    const [developmentCheckList, setDevelopmentCheckList] = useState<CheckList | null>(null)
    const [deliveryCheckList, setDeliveryCheckList] = useState<CheckList | null>(null)
    const [checkList, setCheckList] = useState<ProjectCheckList | null>(null);
    const [progress, setProgress] = useState<ProjectProgress | null>(null);
    const [projectStatus, setProjectStatus] = useState<ProjectStatus | null>(null);

    useEffect(() => {
        setDesignCheckList(project.process?.design?.checkList ?? null)
    }, [project.process?.design?.checkList, setDesignCheckList]);

    useEffect(() => {
        setDevelopmentCheckList(project.process?.development?.checkList ?? null)
    }, [project.process?.development?.checkList, setDevelopmentCheckList]);

    useEffect(() => {
        setDeliveryCheckList(project.process?.delivery?.checkList ?? null)
    }, [project.process?.delivery?.checkList, setDeliveryCheckList]);

    useEffect(() => {
        if (updatedDesignCheckList) {
            setDesignCheckList(new CheckList(updatedDesignCheckList))
        }
    }, [updatedDesignCheckList, setDesignCheckList]);

    useEffect(() => {
        if (updatedDevelopmentCheckList) {
            setDevelopmentCheckList(new CheckList(updatedDevelopmentCheckList))
        }
    }, [updatedDevelopmentCheckList, setDevelopmentCheckList]);

    useEffect(() => {
        if (updatedDeliveryCheckList) {
            setDeliveryCheckList(new CheckList(updatedDeliveryCheckList))
        }
    }, [updatedDeliveryCheckList, setDeliveryCheckList]);

    useEffect(() => {
        setCheckList(new ProjectCheckList(
            {
                design_check_list: designCheckList ? designCheckList.toCheckListObject() : null,
                development_check_list: developmentCheckList ? developmentCheckList.toCheckListObject() : null,
                delivery_check_list: deliveryCheckList ? deliveryCheckList.toCheckListObject() : null
            }
        ))
    }, [designCheckList, developmentCheckList, deliveryCheckList, setCheckList]);

    useEffect(() => {
        if (checkList) {
            setProgress(new ProjectProgress(checkList));
        }
    }, [checkList, setProgress]);

    useEffect(() => {
        if (progress) {
            const projectStatusObject: ProjectStatusObject = {
                created_at: project?.process?.status?.createdAt ?? null,
                updated_at: project?.process?.status?.updatedAt ?? null,
                progress: progress.completion
            }

            setProjectStatus(new ProjectStatus(projectStatusObject, progress));
        }
    }, [progress, setProjectStatus]);

    return (
        <>
            {project.process && project.process.status && <Status status={project.process.status} />}
        </>
    )
}

export default UpdateStatus