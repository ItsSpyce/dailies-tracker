import { Trash2 } from 'react-feather';
import { StyledContainerWithTail, Tail } from './ContainerWithTail.styles';
import { useTheme } from 'styled-components';

export interface ContainerWithTailProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ContainerWithTail: React.FC<ContainerWithTailProps> = ({
  children,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  return (
    <StyledContainerWithTail {...props}>
      {children}
      <Tail onClick={onClick}>
        <Trash2 size="1.165rem" color={theme.colors.text} />
      </Tail>
    </StyledContainerWithTail>
  );
};
