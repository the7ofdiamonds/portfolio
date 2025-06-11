import React from 'react'

import { Task } from '@/model/Task'
import { ProjectQuery } from '@/model/ProjectQuery';

import styles from './Task.module.scss';

type TaskDescriptionProps = {
    task: Task;
    query: ProjectQuery;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ task, query }) => {
    return (<>
        {task.link && !task.fromSameProject(query) ?
            (<a className={styles['task-details']} href={`/portfolio/${task.link}`} target="_blank">
                <h5>{task.description}</h5>
            </a>) :
            <h5>{task.description}</h5>}
    </>
    )
}

export default TaskDescription