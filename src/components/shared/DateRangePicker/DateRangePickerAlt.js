import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { DateRangeAltWrapper } from './styles';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useTheme } from '@mui/material';

const DateRangePickerAlt = ({ initialDateRange, onChange, ...props }) => {
  const [focusedRange, setFocusedRange] = useState(undefined);
  const { palette } = useTheme();
  const isDark = palette.type === 'dark';

  const [ranges, setRanges] = useState([
    {
      startDate: initialDateRange?.startDate || null,
      endDate: initialDateRange?.endDate || new Date(null),
      key: 'rollup',
    },
  ]);

  useEffect(() => {
    if (focusedRange && focusedRange.length && focusedRange[0] === focusedRange[1]) {
      onChange(ranges[0]);
    }
  }, [focusedRange]);

  return (
    <DateRangeAltWrapper palette={palette} isDark={isDark}>
      <DateRangePicker
        focusedRange={focusedRange}
        onRangeFocusChange={(focus) => {
          setFocusedRange(focus);
        }}
        editableDateInputs={true}
        ranges={ranges}
        staticRanges={[]}
        showDateDisplay={false}
        color="#1976d2"
        onChange={(ranges) => setRanges([ranges.rollup])}
        {...props}
      />
    </DateRangeAltWrapper>
  );
};

export default DateRangePickerAlt;
