import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

interface HandleTime {
  (start: Dayjs | null, end: Dayjs | null): void;
}
const TimeSelectors: React.FC<{
  handleTime: HandleTime;
}> = ({ handleTime, startTime, setStartTime, endTime, setEndTime }) => {
  // const [startTime, setStartTime] = useState<Dayjs | null>(null);
  // const [endTime, setEndTime] = useState<Dayjs | null>(null);
  useEffect(() => {
    handleTime(startTime, endTime);
  }, [startTime, endTime]);
  return (
    <Box sx={{ display: 'flex', direction: 'row' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          minutesStep={5}
          label="Start Time"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          minutesStep={5}
          label="End Time"
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};

TimeSelectors.propTypes = {
  handleTime: PropTypes.func.isRequired,
};

export default TimeSelectors;
