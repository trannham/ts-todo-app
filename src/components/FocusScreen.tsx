import React from 'react';
import styled from 'styled-components';

import useTaskStore from '../hooks/use-task-store';
import Button from './Button';
import Spacer from './Spacer';
import TextButton from './TextButton';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Task = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 32px;
  justify-content: center;
  padding-bottom: 45px;
`;

type Props = {};

const FocusScreen: React.FC<Props> = () => {
  const { focusedTask: task, shuffleFocusedTask, updateTaskCompletion } = useTaskStore();

  const handleMarkCompleted = () => {
    if (task) updateTaskCompletion(task.id, true);
  };

  return task ? (
    <Container>
      <Task>{task.label}</Task>
      <Button onClick={handleMarkCompleted}>Mark completed</Button>
      <Spacer height={45} />
      <TextButton onClick={shuffleFocusedTask}>nope</TextButton>
    </Container>
  ) : (
    <div>No incomplete tasks. Yay!</div>
  );
};

export default FocusScreen;
