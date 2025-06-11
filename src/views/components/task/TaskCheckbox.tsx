import React from 'react'

import { Task } from '@/model/Task'

import styles from './Task.module.scss';

type TaskCheckboxProps = {
    task: Task;
}

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({ task }) => {
    return (
        <input
            className={styles.input}
            type="checkbox"
            name={`task_${task.id}`}
            id={`task_${task.id}`}
            checked={task.status}
            disabled
        />
    )
}

export default TaskCheckbox