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

import { SpaceCard } from '../../components/SpaceCard/SpaceCard';
import { FaWifi } from 'react-icons/fa';
import { useState } from 'react';
import {
  RangeCalendarPanel,
  Month_Names_Short,
  Weekday_Names_Short,
  OnDateSelected,
} from 'chakra-dayzed-datepicker';
import { BookingCart } from '../../components/BookingCart';
import {
  SpaceBook,
  SpaceBookingPanel,
} from 'apps/web/components/SpaceBookingPanel';

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

        <SpaceBookingPanel
          spaces={spaces}
          workspace={workspace}
          onBookSpaces={() => {}}
        ></SpaceBookingPanel>
      </Box>
    </>
  );
};
export default Workspace;
