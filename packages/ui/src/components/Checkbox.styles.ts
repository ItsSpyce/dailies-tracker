import { sif } from '@/utils/scomp';
import styled from 'styled-components';

export const StyledCheckbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const CheckboxBox = styled.div<{ focused?: string; readOnly: boolean }>`
  height: 24px;
  width: 24px;
  border: 3px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${sif('focused', 'focused')} {
    border-color: ${(props) => props.theme.colors.accent};
  }

  ${sif('readOnly', 'readOnly')} {
    cursor: default;
    background-color: ${(props) => props.theme.colors.backgroundColored};
  }
`;

export const CheckboxCheck = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-weight: 700;
  font-size: 20px;
  user-select: none;
`;

export const CheckboxLabel = styled.label`
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  user-select: none;
`;
