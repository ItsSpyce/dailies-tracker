import { darken } from 'polished';
import styled from 'styled-components';

export const StyledContainerWithTail = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

export const Tail = styled.div`
  height: 50%;
  background-color: ${(props) => props.theme.colors.textColoredLight};
  border: 1px solid ${(props) => props.theme.colors.text};
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // centered is actually not good here, the border radius
  // makes it seem off center
  padding: 0 0.7rem 0 0.5rem;
  cursor: pointer;
`;
