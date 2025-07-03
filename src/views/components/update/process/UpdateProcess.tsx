import React from 'react'

import Project from '@/model/Project';

import UpdateStatus from '../components/UpdateStatus';
import UpdateDesign from './UpdateDesign';
import UpdateDevelopment from './UpdateDevelopment';
import UpdateDelivery from './UpdateDelivery';

interface UpdateProcessProps {
    project: Project;
}

const UpdateProcess: React.FC<UpdateProcessProps> = ({ project }) => {
    return (
        <div className='update' id='update_process'>
            <h1 className='title'>process</h1>

            <UpdateStatus project={project} />

            <br />

            <UpdateDesign project={project} />

            <br />

            <UpdateDevelopment project={project} />

            <br />

            <UpdateDelivery project={project} />

            <br />

            <button>
                <h3>UPDATE PROCESS</h3>
            </button>
        </div>
    )
}

export default UpdateProcess