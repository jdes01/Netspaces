import { Text, Button, Box, ChakraProvider } from '@chakra-ui/react';
import {
  Month_Names_Short,
  OnDateSelected,
  RangeCalendarPanel,
  Weekday_Names_Short,
} from 'chakra-dayzed-datepicker';

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
} from '@uselessdev/datepicker';

import React from 'react';

type Props = {
  onAddSpaceBookHandler: (dates: any) => void;
};

export const SpaceAvailabilityCalendar: React.FunctionComponent<Props> = ({
  onAddSpaceBookHandler,
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
      <Text
        fontWeight="semibold"
        fontSize="xs"
        textTransform="uppercase"
        left={0}
        top={0}
      ></Text>

      <ChakraProvider theme={CalendarDefaultTheme}>
        <Calendar
          value={dates}
          onSelectDate={handleSelectDate}
          months={MONTHS}
          allowSelectSameDay
        >
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton
              onClick={(e) => {
                console.log(e);
              }}
            />
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
      >
        Add space book!
      </Button>
    </Box>
  );
};
