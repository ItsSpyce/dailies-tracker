import { sides } from '@/utils/scomp';
import { lighten } from 'polished';
import styled from 'styled-components';
import { TextButton } from './Button';

export const StyledDatePicker = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 3px solid ${(props) => props.theme.colors.border};
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.colors.background};
  font-family: 'ZH', sans-serif;
  padding: 1rem 0.5rem 1rem 1rem;
  cursor: pointer;
  user-select: none;
  align-items: center;
`;

export const CalText = styled.span`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`;

export const DayOfWeek = styled.span`
  color: ${(props) => lighten(0.4, props.theme.colors.text)};
`;

export const DayOfMonth = styled.span``;

export const DatePickerPopup = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.background};
  ${sides('-3px', '-3px', 'initial')}
  border-radius: 1.5rem 1.5rem 0 0;
  border: 3px solid ${(props) => props.theme.colors.border};
  z-index: 999;
`;

export const PopupTitle = styled.span`
  display: flex;
  flex-direction: row;
  padding: 18px 1rem;
  column-gap: 0.5rem;
  align-items: center;
`;

export const PopupBody = styled.div`
  .react-calendar {
    font-family: 'ZH', sans-serif;
    background-color: ${(props) => props.theme.colors.background};
    outline: none;
    border: none;

    button {
      font-family: 'ZH', sans-serif;
    }
  }
`;

export const MonthSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  padding: 0 1rem;

  ${TextButton} {
    &::after {
      display: none;
    }
  }
`;

export const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
