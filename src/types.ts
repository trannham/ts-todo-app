import React from 'react';
export type Task = {
  id: string;
  label: string;
  isCompleted: boolean;
};

export type TasksProps = {
  // eslint-disable-next-line no-unused-vars
  addTask: (task: Pick<Task, 'label'>) => void;
  focusedTask?: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  // eslint-disable-next-line no-unused-vars
  updateTaskCompletion: (taskId: string, isCompleted: boolean) => void;
  shuffleFocusedTask: () => void;
};
