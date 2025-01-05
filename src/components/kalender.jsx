import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

function RealTimeDate() {
  const [currentDate, setCurrentDate] = React.useState(dayjs());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentDate;
}
export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
        sx={{
          '& .MuiPickersDay-root': {
            color: 'inherit'
          },
          '& .MuiPickersDay-today': {
            border: 'none',
            backgroundColor: '#3B82F6'
          },
          '& .MuiTypography-root': {
            color: 'inherit'
          },
          '& .MuiDayCalendar-weekDayLabel': {
            color: 'inherit'
          },
          '& .MuiPickersArrowSwitcher-button': {
            color: 'inherit'
          },
          '& .MuiPickersCalendarHeader-switchViewButton': {
            color: 'inherit'
          }
        }}
      />
    </LocalizationProvider>
  );
}