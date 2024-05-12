import styled from 'styled-components';
import { breakpoints } from '../utils';

export const ButtonGroup = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  ${breakpoints('md')} {
    flex-direction: ${(props) => props.direction || 'row-reverse'};
  }
`;
