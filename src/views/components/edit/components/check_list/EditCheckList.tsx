import React, { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import {
    CheckList,
    CheckListObject,
    Project,
    Task,
    TaskObject,
    Tasks
} from '@the7ofdiamonds/ui-ux';

import { updateDesignCheckList, updateDevelopmentCheckList, updateDeliveryCheckList } from '@/controllers/updateSlice';

import { useAppDispatch } from '@/model/hooks';

import styles from './CheckList.module.scss';

interface UpdateCheckListProps {
    location: string;
    checkList: CheckList;
    setCheckList: (checkList: CheckList) => void
}

export const EditCheckList: React.FC<UpdateCheckListProps> = ({ location, checkList, setCheckList }) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>('');
    const [tasks, setTasks] = useState<Tasks>(new Tasks);
    const [task, setTask] = useState<Task>(new Task());
    const [selectedTasks, setSelectedTasks] = useState<Set<Task>>(new Set);

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (checkList && checkList.title) {
            setTitle(checkList.title)
        }
    }, [checkList.title]);

    useEffect(() => {
        if (checkList && checkList.tasks) {
            setTasks(checkList.tasks);
        }
    }, [checkList.tasks]);

    useEffect(() => {
        if (checkList && checkList.tasks && checkList.tasks.list) {
            setSelectedTasks(checkList.tasks.list);
        }
    }, [checkList.tasks?.list]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        task: Task
    ) => {
        const { name, value, checked } = e.target;

        let description = task.description ?? '';
        let status = task.status;
        let details = task.details ?? '';
        let weight = task.weight;

        const taskRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-task$/;
        const statusRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-status$/;
        const detailsRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-details$/;
        const weightRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-weight$/;

        if (taskRegex.test(name)) {
            description = value;
        }

        if (statusRegex.test(name)) {
            status = checked;
        }

        if (detailsRegex.test(name)) {
            details = value;
        }

        if (weightRegex.test(name)) {
            weight = parseInt(value);
        }

        if (!tasks.existsInSet(task)) {
            task.setDescription(description)
            task.setStatus(status)
            task.setDetails(details)
            task.setWeight(weight)
        }
    };

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        let id = task.id !== '' ? task.id : uuidv4();
        let description = task.description;
        let status = task.status;
        let details = task.details;
        let weight = task.weight;

        if (name === 'description') {
            description = value;
        }

        if (name === 'status') {
            status = checked;
        }

        if (name === 'details') {
            details = value;
        }

        if (name === 'weight') {
            weight = parseInt(value);
        }

        let taskObject: TaskObject = {
            id: id,
            description: description,
            status: status,
            details: details,
            weight: weight,
            link: '',
            subTasks: []
        }

        setTask(new Task(taskObject))
    }

    const handleCheckListNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'check_list_title') {
            setTitle(value);
            checkList.setTitle(value);
        }
    };

    const handleAddToCheckList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (tasks.existsInSet(task)) {
                throw new Error('This task already exists.')
            }

            if (task.description !== '') {

                const updatedTasks = selectedTasks.add(task)
                setSelectedTasks(updatedTasks);

                if (checkList) {
                    checkList.setTasks(tasks)
                }

                setTask(new Task());
            } else {
                throw new Error('A description is required')
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    const handleUpdateTasks = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (location === 'design') {
                dispatch(updateDesignCheckList(checkList));
            }

            if (location === 'development') {
                dispatch(updateDevelopmentCheckList(checkList));
            }

            if (location === 'delivery') {
                dispatch(updateDeliveryCheckList(checkList));
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    }

    return (
        <details>
            <summary>{title} Check List</summary>

            <br />

            <div className="update">

                {selectedTasks.size > 0 ? (Array.from(selectedTasks).map((task) => (
                    <div className="form-item" key={task.id}>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-status`}>Status:</label>
                            <input
                                type="checkbox"
                                placeholder="Status"
                                checked={task.status}
                                name={`${task.id}-status`}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-ID`}>ID:</label>
                            <input
                                type="text"
                                placeholder="ID"
                                value={task.id ?? ""}
                                name={`${task.id}-ID`}
                                disabled
                            />
                        </div>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-details`}>Details:</label>
                            <input
                                type="text"
                                placeholder="Details"
                                value={task.details ?? ''}
                                name={`${task.id}-details`}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                        <div className="form-item-flex">
                            <label htmlFor={`${task.id}-task`}>Task:</label>
                            <input
                                type="text"
                                placeholder="Task"
                                value={task.description ?? ''}
                                name={`${task.id}-task`}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                        <div className='form-item-flex'>
                            <label htmlFor={`${task.weight}-weight`}>Weignt:</label>
                            <input
                                type="number"
                                name={`${task.id}-weight`}
                                value={task.weight}
                                onChange={(e) => handleChange(e, task)}
                            />
                        </div>
                    </div>)
                )) : (<h3>There are no {location} task at this time.</h3>)}

                <form id={`add_task_${location}`} onSubmit={handleAddToCheckList}>
                    <hr />

                    <h4>Add Task</h4>

                    <div className='form-item'>
                        <div className='form-item-flex'>
                            <label htmlFor="status">Status:</label>
                            <input type="checkbox" name='status' checked={task.status} onChange={handleTaskChange} />
                        </div>

                        <div className='form-item-flex'>
                            <label htmlFor="description">Description:</label>
                            <input type="text" name='description' value={task.description ?? ''} onChange={handleTaskChange} />
                        </div>

                        <div className='form-item-flex'>
                            <label htmlFor="weight">Weignt:</label>
                            <input type="number" name='weight' value={task.weight} onChange={handleTaskChange} />
                        </div>

                        <button type="submit">
                            <h3>Add Task</h3>
                        </button>
                    </div>
                </form>

                <hr />

                <div className='form-item-flex'>
                    <label htmlFor="check_list_title">Check List Title:</label>
                    <input type="text" value={title} name='check_list_title' onChange={handleCheckListNameChange} />
                </div>

                <button type="button" onClick={handleUpdateTasks}>
                    <h3>Update Tasks</h3>
                </button>
            </div>
        </details>
    )
}