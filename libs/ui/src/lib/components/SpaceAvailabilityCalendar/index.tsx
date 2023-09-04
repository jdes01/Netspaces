import { Button, Box, ChakraProvider } from '@chakra-ui/react';

import {
  Calendar,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
  CalendarDefaultTheme,
  CalendarValues,
  CalendarDate,
} from '@uselessdev/datepicker';

import React, { useContext } from 'react';

type Props = {
  onAddSpaceBookHandler: (dates: any) => void;
  disabled: boolean;
  disabledDates: Array<CalendarDate>;
};

export const SpaceAvailabilityCalendar: React.FunctionComponent<Props> = ({
  onAddSpaceBookHandler,
  disabled,
  disabledDates,
}) => {
  const MONTHS = 2;

  const [dates, setDates] = React.useState<CalendarValues>({});
  const handleSelectDate = (dates: CalendarValues) => setDates(dates);

  return (
    <Box
      marginTop={5}
      display={'block'}
      justifyContent={'center'}
      width={'100%'}
      shadow={'base'}
      borderRadius={20}
      padding={10}
      height={'fit-content'}
    >
      <ChakraProvider theme={CalendarDefaultTheme}>
        <Calendar
          value={dates}
          onSelectDate={handleSelectDate}
          months={MONTHS}
          allowSelectSameDay
          disableDates={disabledDates}
          disablePastDates={true}
        >
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton />
          </CalendarControls>

          <CalendarMonths>
            {[...Array(MONTHS).keys()].map((month) => (
              <CalendarMonth month={month} key={month}>
                <CalendarMonthName />
                <CalendarWeek />
                <CalendarDays />
              </CalendarMonth>
            ))}
          </CalendarMonths>
        </Calendar>
      </ChakraProvider>
      <Button
        color={'teal'}
        onClick={() => {
          onAddSpaceBookHandler(dates);
          setDates({});
        }}
        isDisabled={disabled}
      >
        Add space book!
      </Button>
    </Box>
  );
};
