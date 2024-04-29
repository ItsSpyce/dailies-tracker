import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'react-feather';
import Calendar, { CalendarProps } from 'react-calendar';
import {
  CalText,
  DatePickerPopup,
  DayOfMonth,
  DayOfWeek,
  MonthSelector,
  PopupBody,
  PopupTitle,
  StyledDatePicker,
} from './DatePicker.styles';
import { I18n } from './I18n';
import { TextButton } from './Button';
import { useTheme } from 'styled-components';
import 'react-calendar/dist/Calendar.css';

export type DatePickerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'value' | 'onChange'
> & {
  value: Date;
  onChange?: (date: Date) => void;
};

const daysInMonth = (month: number, year: number) => {
  if (month === 2) {
    return year % 4 === 0 ? 29 : 28;
  }
  return month % 2 === 0 ? 30 : 31;
};

const getPreviousMonthDays = (month: number, year: number) => {
  if (month === 1) {
    year -= 1;
    month = 12;
  }
  return daysInMonth(month, year);
};

const getRowsForMonth = (month: number, year: number) => {
  const daysCount = daysInMonth(month, year);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month, daysCount);
  const lastMonthsDaysCount = getPreviousMonthDays(month, year);
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const today = new Date();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const theme = useTheme();

  const handleOnChange: CalendarProps['onChange'] = (date) => {
    if (date instanceof Date) {
      setSelectedValue(date);
      setIsPopupVisible(false);
      if (onChange) {
        onChange(date);
      }
    }
  };

  return (
    <StyledDatePicker
      {...props}
      onClick={() => {
        if (!isPopupVisible) {
          setIsPopupVisible(true);
        }
      }}
    >
      <CalText>
        <DayOfWeek>
          <I18n iden={`calendar.days.${selectedValue.getDay()}`} />
        </DayOfWeek>
        <DayOfMonth>
          <I18n iden={`calendar.months.${selectedValue.getMonth() + 1}`} />{' '}
          {selectedValue.getDate()}
        </DayOfMonth>
      </CalText>
      <CalendarIcon color={theme.colors.textColored} size={24} />
      {isPopupVisible && (
        <DatePickerPopup>
          <PopupTitle onClick={() => setIsPopupVisible((prev) => !prev)}>
            <TextButton
              onClick={() => {
                // @ts-ignore
                handleOnChange(today);
              }}
            >
              Today
            </TextButton>
          </PopupTitle>
          <PopupBody>
            <Calendar onChange={handleOnChange} value={value} />
          </PopupBody>
        </DatePickerPopup>
      )}
    </StyledDatePicker>
  );
};
