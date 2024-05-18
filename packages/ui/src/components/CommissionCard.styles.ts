import { lighten, rgba } from 'polished';
import styled from 'styled-components';
import { CheckboxBox } from './Checkbox.styles';

export const StyledCommissionCard = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 3px solid ${(props) => lighten(0.1, props.theme.colors.border)};
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 1rem;
  padding-left: 1rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.border};
  }

  * {
    user-select: none;
  }
`;

export const CommissionMarker = styled.div``;

export const CommissionCardText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  z-index: 1;
  background-color: ${(props) => rgba(props.theme.colors.background, 0.7)};
`;

export const CommissionTitle = styled.span`
  font-size: 1.15rem;
`;

export const CommissionRealm = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textColoredLight};
  font-family: 'ZH', sans-serif;
`;

export const Rewards = styled.div`
  padding: 1.5rem 0.5rem;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  justify-content: flex-end;
`;

export const CompletedPanel = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColored};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0.5rem 0.5rem 0;
  height: 100%;
  width: 60px;

  ${CheckboxBox} {
    border-color: ${(props) => lighten(0.1, props.theme.colors.border)};
    border-width: 1px;
  }
`;
