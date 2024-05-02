import {
  CircleProgress,
  ForegroundCircle,
  StyledTaskCompletionStatus,
  TaskStatus,
} from './TaskCompletionStatus.styles';

export interface TaskCompletionStatusProps {
  totalTasks: number;
  completedTasks: number;
}

export const TaskCompletionStatus: React.FC<TaskCompletionStatusProps> = ({
  totalTasks,
  completedTasks,
}) => {
  const progress = (completedTasks / totalTasks) * 100;
  return (
    <StyledTaskCompletionStatus progress={isNaN(progress) ? 0 : progress}>
      <CircleProgress width="210" height="210" viewBox="0 0 250 250">
        <ForegroundCircle></ForegroundCircle>
      </CircleProgress>
      <TaskStatus>
        <h1>{completedTasks}</h1>
        <h3>{completedTasks === 1 ? 'Task' : 'Tasks'}</h3>
      </TaskStatus>
    </StyledTaskCompletionStatus>
  );
};
