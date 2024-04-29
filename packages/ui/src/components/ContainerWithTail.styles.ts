import { darken } from 'polished';
import styled from 'styled-components';

export const StyledContainerWithTail = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

export const Tail = styled.div`
  width: 40px;
  height: 50%;
  background-color: ${(props) => props.theme.colors.textColoredLight};
  border: 1px solid ${(props) => props.theme.colors.text};
  border-left: none;
  border-radius: 0 1rem 1rem 0;
`;
