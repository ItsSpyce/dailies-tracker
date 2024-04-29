import { darken } from 'polished';
import styled from 'styled-components';

export const StyledClaimRewardsButton = styled.button`
  background-color: ${(props) => props.theme.colors.backgroundColored};
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  align-items: center;
  padding: 16px 12px;
  font-family: inherit;
  font-size: 20px;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  width: 100%;

  &:hover {
    background-color: ${(props) =>
      darken(0.05, props.theme.colors.backgroundColored)};
    outline: none;
    box-shadow: none;
  }
`;
