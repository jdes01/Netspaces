import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Divider,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
  Icon,
  IconButton,
  Flex,
  Grid,
  GridItem,
  Button,
  Stack,
} from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

import { SpaceCard } from '../../components/SpaceCard.tsx';
import { FaWifi } from 'react-icons/fa';
import { useState } from 'react';
import {
  SingleDatepicker,
  RangeCalendarPanel,
  Month_Names_Short,
  Weekday_Names_Short,
  OnDateSelected,
} from 'chakra-dayzed-datepicker';

const GET_WORKSPACE = gql`
  query GetWorkspace($id: String!) {
    workspace(id: $id) {
      _id
      name
      description
      street
      city
      country
      services
      spaces {
        _id
        name
        seats
        workspaceId
        quantity
        amenitys
      }
    }
  }
`;

const Workspace = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const router = useRouter();
  const { uuid } = router.query;

  const { data, loading } = useQuery(GET_WORKSPACE, {
    variables: { id: uuid },
  });

  if (loading) return <Heading>Loading</Heading>;

  const workspace: WorkspaceDTO = data?.workspace;
  const spaces: Array<SpaceDTO> = data?.workspace?.spaces;

  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    let newDates = [...selectedDates];
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        let firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        setSelectedDates(newDates);
        return;
      }

      if (newDates.length === 2) {
        setSelectedDates([date]);
        return;
      }
    } else {
      newDates.push(date);
      setSelectedDates(newDates);
    }
  };

  return (
    <>
      <Box
        padding={5}
        display={'block'}
        justifyContent={'center'}
        maxWidth={1200}
        margin={'auto'}
      >
        <Box fontWeight={'semibold'} width={'100%'} height={100}>
          <Heading fontWeight="bold" lineHeight="tight" noOfLines={1}>
            {workspace.name}
          </Heading>
          <Box marginTop={3}>
            <Text fontWeight="semibold" fontSize="xs" textTransform="uppercase">
              Calle {workspace.street}
            </Text>
            <Text fontWeight="semibold" fontSize="xs" textTransform="uppercase">
              {workspace.city}, {workspace.country}
            </Text>
          </Box>
        </Box>

        <Divider marginTop={3} />

        <Box width={'100%'} marginTop={5}>
          <HStack overflowX="auto" margin={'auto'}>
            <Image
              borderRadius={20}
              margin={'auto'}
              src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg"
            />
            <Image
              borderRadius={20}
              margin={'auto'}
              src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg"
            />
            <Image
              borderRadius={20}
              margin={'auto'}
              src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg"
            />
          </HStack>
        </Box>

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
              shadow={'base'}
              borderRadius={20}
              width={'100%'}
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
                {workspace.description}
              </Text>
            </Box>
          </GridItem>

          <GridItem rowSpan={4} colSpan={2}>
            <Box
              position={'sticky'}
              shadow={'base'}
              top={10}
              marginTop={10}
              padding={5}
              borderRadius={15}
              width={'100%'}
              height={300}
            >
              <Text
                fontWeight="semibold"
                fontSize="xs"
                textTransform="uppercase"
                left={0}
                top={0}
                marginBottom={3}
              >
                Book dates!
              </Text>
              <SingleDatepicker
                date={selectedDate}
                onDateChange={setSelectedDate}
                closeOnSelect={true}
              />
              <Button width={'100%'} marginTop={5}>
                Book!
              </Button>
            </Box>
          </GridItem>

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
                {workspace.services.map((service) => (
                  <Flex alignItems="center">
                    <FaWifi></FaWifi>
                    <Box marginLeft={3} width={'100%'} borderRadius={20}>
                      {service}
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={4}>
            <Box display={'flex'} justifyContent={'center'}>
              <Box width={'100%'}>
                <HStack overflowX="auto" mt={1} pb={2}>
                  {spaces.map((space) => (
                    <SpaceCard space={space}></SpaceCard>
                  ))}
                </HStack>
              </Box>
            </Box>
          </GridItem>

          <GridItem rowSpan={1} colSpan={4}>
            <Box
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
                Check availability!
                {selectedDates.map((date) => date.toLocaleDateString())}
              </Text>
              <Box marginTop={5}>
                <RangeCalendarPanel
                  selected={selectedDates}
                  dayzedHookProps={{
                    showOutsideDays: false,
                    onDateSelected: handleOnDateSelected,
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
                <Button
                  onClick={() => {
                    setSelectedDates([]);
                  }}
                >
                  Clear!
                </Button>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
export default Workspace;
