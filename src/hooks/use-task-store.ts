import { shuffle } from 'lodash';
import { nanoid } from 'nanoid';
import { useContext, useEffect, useState } from 'react';

import TaskContext from '../contexts/task-store';
import { Task } from '../types';

const useTaskStore = () => {
  const [tasks, setTasks] = useContext(TaskContext);
  const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(
    tasks.filter((task) => !task.isCompleted)[0]?.id,
  );

  const addTask = (task: Pick<Task, 'label'>) => {
    const id = nanoid();
    setTasks((tasks) => [
      ...tasks,
      { id: nanoid(), label: task.label, isCompleted: false },
    ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  };

  const updateTaskCompletion = (taskId: string, isCompleted: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isCompleted };
        return task;
      }),
    );
  };

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  useEffect(() => {
    if (focusedTask?.isCompleted)
      setFocusedTaskId(tasks.filter((task) => !task.isCompleted)[0]?.id);
  }, [tasks, focusedTask]);

  const shuffleFocusedTask = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isCompleted))[0]?.id);
  };

  const api = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion,
  };

  return api;
};

export default useTaskStore;
