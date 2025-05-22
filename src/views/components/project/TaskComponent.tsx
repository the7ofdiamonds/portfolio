import React from 'react'

import { Task } from '@/model/Task'
import { ProjectQuery } from '@/model/ProjectQuery';

import TaskCheckbox from './TaskCheckbox';
import TaskDescription from './TaskDescription';

type TaskComponentProps = {
    task: Task;
    query: ProjectQuery;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, query }) => {
    return (
        <>
            <div className='task' key={task.id}>
                <span className='task-row'>
                    <TaskCheckbox task={task} />
                    <TaskDescription task={task} query={query} />
                </span>

                {task.subTasks && Array.isArray(task.subTasks) &&
                    task.subTasks.length > 0 &&
                    <div className='sub-task'>
                        {task.subTasks.map((task) => (
                            <div className='task' key={task.id}>
                                <span className='task-row'>
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