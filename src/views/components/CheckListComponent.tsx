import React, { useEffect, useState } from 'react';

import TaskComponent from './task/TaskComponent';

import { Task } from '@/model/Task';
import { CheckList } from '@/model/CheckList';
import { ProjectQuery } from '@/model/ProjectQuery';

import styles from './CheckList.module.scss';

interface CheckListProps {
  checkList: CheckList;
  query: ProjectQuery;
}

export const CheckListComponent: React.FC<CheckListProps> = ({ checkList, query }) => {
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Set<Task> | null>(null);

  useEffect(() => {
    if (checkList.id) {
      setId(checkList.id)
    }
  }, [checkList, query]);

  useEffect(() => {
    if (checkList.title) {
      setTitle(checkList.title)
    }
  }, [checkList, query]);

  useEffect(() => {
    if (checkList.tasks) {
      setTasks(checkList.tasks)
    }
  }, [checkList, query]);

  return (
    <>
      {tasks && tasks.size > 0 && id ? (
        <div className={styles.checklist} >

          {title && (<h4>{title}</h4>)}

          {Array.from(tasks).map((task) => (
            <TaskComponent task={task} query={query} key={task.id} />
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}