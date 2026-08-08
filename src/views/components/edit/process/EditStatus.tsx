import React, { useEffect, useState } from 'react';

import {
    CheckList,
    Project,
    ProjectCheckList,
    ProjectProcess,
    ProjectProgress,
    ProjectStatus
} from '@the7ofdiamonds/ui-ux';

import Status from '../../../../views/components/project/Status';

interface EditStatusProps {
    id: string | number | null;
    process: ProjectProcess;
    setProcess: React.Dispatch<React.SetStateAction<ProjectProcess>>;
}

export const EditStatus: React.FC<EditStatusProps> = ({ id, process, setProcess }) => {
    const [designCheckList, setDesignCheckList] = useState<CheckList | null>(null)
    const [developmentCheckList, setDevelopmentCheckList] = useState<CheckList | null>(null)
    const [deliveryCheckList, setDeliveryCheckList] = useState<CheckList | null>(null)
    const [checkList, setCheckList] = useState<ProjectCheckList | null>(null);
    const [progress, setProgress] = useState<ProjectProgress | null>(null);

    useEffect(() => {
        if (process?.design?.checkList) {
            setDesignCheckList(process.design.checkList)
        }
    }, [process?.design?.checkList]);

    useEffect(() => {
        if (process?.development?.checkList) {
            setDevelopmentCheckList(process.development.checkList)
        }
    }, [process?.development?.checkList]);

    useEffect(() => {
        if (process?.delivery?.checkList) {
            setDeliveryCheckList(process.delivery.checkList)
        }
    }, [process?.delivery?.checkList]);

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
            if (process && process.status) {
                process.status.setProgress(progress)
            } else {
                const projectStatus = new ProjectStatus();
                projectStatus.setProgress(progress)
                const projectProcess = new ProjectProcess();
                projectProcess.setStatus(projectStatus)
                setProcess(projectProcess)
            }
        }
    }, [progress]);

    return (
        <>
            {process && process.status && <Status status={process.status} />}
        </>
    )
}