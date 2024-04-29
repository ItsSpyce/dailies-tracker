import { StyledContainerWithTail, Tail } from './ContainerWithTail.styles';

export interface ContainerWithTailProps {
  children: React.ReactNode;
}

export const ContainerWithTail: React.FC<ContainerWithTailProps> = ({
  children,
}) => (
  <StyledContainerWithTail>
    {children}
    <Tail />
  </StyledContainerWithTail>
);
