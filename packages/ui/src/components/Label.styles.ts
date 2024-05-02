import styled from 'styled-components';
import { sif } from '../utils';

export const StyledLabel = styled.label<{
  align: 'center' | 'left' | 'right';
}>`
  display: grid;
  column-gap: 8px;
  ${sif('align', 'left')} {
    grid-template-columns: auto 1fr;
  }

  ${sif('align', 'center')} {
    grid-template-columns: 1fr auto 1fr;
  }

  ${sif('align', 'right')} {
    grid-template-columns: 1fr auto;
  }
`;

export const Line = styled.div`
  content: '';
  width: 100%;
  height: 4px;
  margin-top: 0.6rem;
  background-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
`;
