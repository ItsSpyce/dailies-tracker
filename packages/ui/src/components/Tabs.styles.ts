import styled from 'styled-components';
import { Button } from './Button';

export const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TabsButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabButton = styled(Button)<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? props.theme.colors.accent : 'transparent'};
  color: ${(props) => (props.active ? 'white' : props.theme.colors.text)};
  border: none;
`;

export const TabsBody = styled.div``;

export const StyledTab = styled.div``;
