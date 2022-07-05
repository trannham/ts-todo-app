import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';

import useTaskStore from '../hooks/use-task-store';
import DeleteIcon from '../icons/DeleteIcon';
import { Task } from '../types';
import IconButton from './IconButton';
import Spacer from './Spacer';
import TextButton from './TextButton';

const Container = styled.div`
  display: flex;
  width: 460px;
  flex-direction: column;
  align-items: stretch;
`;

const List = styled.div`
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 45px 24px;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.label`
  padding: 4px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;
  ${ListItem}:hover & {
    visibility: visible;
  }
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 15px;
  border: none;
  padding: 20px 24px;
`;

type Props = {};

const ListScreen: React.FC<Props> = () => {
  const { tasks, addTask, setTasks, updateTaskCompletion } = useTaskStore();
  const [newTaskLabel, setNewTaskLabel] = useState('');

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value);
  };

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskLabel !== '') {
      addTask({ label: newTaskLabel });
      setNewTaskLabel('');
    }
  };

  const handleCompleteChange = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    updateTaskCompletion(task.id, e.target.checked);
  };

  const handleClearClick = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isCompleted));
  };

  const handleTaskDeleteClick = (handledTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handledTask.id));
  };
  return (
    <Container>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={handleCompleteChange(task)}
            />
            <Spacer width={24} />
            {task.label}
            <Spacer flex={1} />
            <DeleteButton onClick={handleTaskDeleteClick(task)}>
              <DeleteIcon />
            </DeleteButton>
          </ListItem>
        ))}
      </List>
      <Spacer height={30} />
      <Input
        placeholder="Add a task"
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <Spacer height={45} />
      <TextButton onClick={handleClearClick}>Clear completed</TextButton>
    </Container>
  );
};

export default ListScreen;
