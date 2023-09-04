import {
  Grid,
  GridItem,
  Text,
  Box,
  SimpleGrid,
  Flex,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaWifi } from 'react-icons/fa';
import { BookingCart } from '../BookingCart';
import { SpaceCard } from '../SpaceCard/SpaceCard';
import { SpaceDTO, WorkspaceDTO } from '../../../../../contracts';
import { SpaceAvailabilityCalendar } from '../SpaceAvailabilityCalendar';

import { gql, useQuery } from '@apollo/client';
import { CalendarValues } from '@uselessdev/datepicker';
import { iconMapper } from '../WorkspaceServiceIcons';

export type SelectedSpace = {
  id: string;
  name: string;
};

export type SpaceBook = {
  space: SelectedSpace;
  initialDate: Date;
  finalDate: Date;
};

type Props = {
  spaces: Array<SpaceDTO>;
  workspace: WorkspaceDTO;
  onBookSpaces: (spaceBooks: Array<SpaceBook>) => void;
};

const GET_SPACE_AVAILABILITY = gql`
  query GetSpaceAvailabilityByMonth(
    $spaceId: String!
    $month: Float!
    $year: Float!
  ) {
    getSpaceAvailabilityByMonth(spaceId: $spaceId, month: $month, year: $year) {
      day
      quantity
    }
  }
`;

export const SpaceBookingPanel: React.FunctionComponent<Props> = ({
  spaces,
  workspace,
  onBookSpaces,
}) => {
  const [selectedSpace, setSelectedSpace] = useState<SelectedSpace>();
  const [spaceBooks, setSpaceBooks] = useState<Array<SpaceBook>>([]);

  const { data, loading } = useQuery(GET_SPACE_AVAILABILITY, {
    variables: {
      spaceId: selectedSpace?.id,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  });

  const dates = data?.getSpaceAvailabilityByMonth as Array<{
    day: number;
    quantity: number;
  }>;

  const unavailableDates = dates
    ?.filter((date) => {
      return date.quantity == 0;
    })
    ?.map((date) => {
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        date.day + 1,
      );
    });

  const handleOnSpaceCardClicked = (space: SpaceDTO) => {
    setSelectedSpace({
      id: space._id,
      name: space.name,
    });
  };

  const handleOnRemoveSpaceBook = (position: number) => {
    const newList = [...spaceBooks];
    newList.splice(position, 1);
    setSpaceBooks(newList);
  };

  const handleOnClearSpaceBooks = () => {
    setSpaceBooks([]);
    setSelectedSpace(undefined);
  };

  const handleOnAddSpaceBookHandler = (dates: CalendarValues) => {
    if (
      selectedSpace === undefined ||
      dates.start === undefined ||
      dates.end === undefined
    )
      return;

    const spaceBook: SpaceBook = {
      space: selectedSpace,
      initialDate: dates.start as Date,
      finalDate: dates.end as Date,
    };

    setSpaceBooks([...spaceBooks, spaceBook]);
  };

  return (
    <Grid
      h="200px"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={4}>
        <Box
          marginTop={5}
          padding={5}
          borderRadius={20}
          shadow={'base'}
          height={'fit-content'}
        >
          <Text
            fontWeight="semibold"
            fontSize="xs"
            textTransform="uppercase"
            left={0}
            top={0}
            marginBottom={3}
          >
            Services:
          </Text>
          <SimpleGrid columns={2}>
            {workspace.services.map((service) => {
              const icon = iconMapper(service);

              return icon ? (
                <Flex alignItems="center">
                  {icon}
                  <Box marginLeft={3} width={'100%'} borderRadius={20}>
                    {service}
                  </Box>
                </Flex>
              ) : (
                <Flex alignItems="center">
                  <Box marginLeft={3} width={'100%'} borderRadius={20}>
                    {service}
                  </Box>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Box>
      </GridItem>

      <GridItem rowSpan={4} colSpan={2} paddingTop={5}>
        <BookingCart
          spaceBooks={spaceBooks}
          onRemoveHandler={handleOnRemoveSpaceBook}
          onClearHandler={handleOnClearSpaceBooks}
          onBookHandler={onBookSpaces}
        ></BookingCart>
      </GridItem>

      <GridItem rowSpan={1} colSpan={4}>
        <Box display={'flex'} justifyContent={'center'}>
          <Box width={'100%'}>
            <HStack overflowX="auto" mt={1} pb={2}>
              {spaces.map((space) =>
                space._id === selectedSpace?.id ? (
                  <SpaceCard
                    key={space._id}
                    space={space}
                    onClick={handleOnSpaceCardClicked}
                    highlighted={true}
                  ></SpaceCard>
                ) : (
                  <SpaceCard
                    key={space._id}
                    space={space}
                    onClick={handleOnSpaceCardClicked}
                    highlighted={false}
                  ></SpaceCard>
                ),
              )}
            </HStack>
          </Box>
        </Box>
      </GridItem>

      <GridItem rowSpan={1} colSpan={4}>
        <Box>
          <Box marginTop={5}>
            <SpaceAvailabilityCalendar
              onAddSpaceBookHandler={handleOnAddSpaceBookHandler}
              disabled={selectedSpace === undefined}
              disabledDates={unavailableDates}
            ></SpaceAvailabilityCalendar>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};
