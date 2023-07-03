import { Text, Button, Box } from '@chakra-ui/react';
import {
  Month_Names_Short,
  OnDateSelected,
  RangeCalendarPanel,
  Weekday_Names_Short,
} from 'chakra-dayzed-datepicker';
import React, { useState } from 'react';
import { SelectedSpace, SpaceBook } from '../SpaceBookingPanel';

type Props = {
  selectedSpace: SelectedSpace | undefined;
  selectedDates: Array<Date>;
  onDateSelected: OnDateSelected;
  onAddSpaceBookHandler: (spaceBook: SpaceBook) => void;
};

export const SpaceAvailabilityCalendar: React.FunctionComponent<Props> = ({
  selectedSpace,
  selectedDates,
  onDateSelected,
  onAddSpaceBookHandler,
}) => {
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
      >
        {selectedSpace
          ? `Check availability for ${selectedSpace?.name}`
          : 'Select an space to check its availability '}
        {selectedDates.map((date) => date.toLocaleDateString())}
      </Text>
      <RangeCalendarPanel
        selected={selectedDates}
        dayzedHookProps={{
          showOutsideDays: false,
          onDateSelected: onDateSelected,
          selected: selectedDates,
          monthsToDisplay: 2,
        }}
        configs={{
          dateFormat: 'MM/dd/yyyy',
          monthNames: Month_Names_Short,
          dayNames: Weekday_Names_Short,
          firstDayOfWeek: 0,
        }}
      />

      {selectedSpace ? (
        <Button
          color={'teal'}
          onClick={() => {
            onAddSpaceBookHandler({
              space: selectedSpace,
              initialDate: selectedDates[0],
              finalDate: selectedDates[1],
            });
          }}
        >
          Add space book!
        </Button>
      ) : (
        <Button>Select an space!</Button>
      )}
    </Box>
  );
};
