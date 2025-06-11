import React from 'react'

import { Task } from '@/model/Task'
import { ProjectQuery } from '@/model/ProjectQuery';

import TaskCheckbox from '../task/TaskCheckbox';
import TaskDescription from '../task/TaskDescription';

import styles from './Task.module.scss';

type TaskComponentProps = {
    task: Task;
    query: ProjectQuery;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, query }) => {
    return (
        <>
            <div className={styles.task} key={task.id}>
                <span className={styles['task-row']}>
                    <TaskCheckbox task={task} />
                    <TaskDescription task={task} query={query} />
                </span>

                {task.subTasks && Array.isArray(task.subTasks) &&
                    task.subTasks.length > 0 &&
                    <div className={styles['sub-task']}>
                        {task.subTasks.map((task) => (
                            <div className={styles.task} key={task.id}>
                                <span className={styles['task-row']}>
                                    <TaskCheckbox task={task} />
                                    <TaskDescription task={task} query={query} />
                                </span>
                            </div>
                        ))}
                    </div>}
            </div>
        </>
    )
}

export default TaskComponent;