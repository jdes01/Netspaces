import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Image, Text, Divider, HStack } from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

import {
  SpaceBook,
  SpaceBookingPanel,
} from 'apps/web/components/SpaceBookingPanel';
import { addDays, differenceInDays } from 'date-fns';

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

const CREATE_BOOKING = gql`
  query CreateBooking($userId: String!, $spaceId: String!, $date: String!) {
    createBooking(userId: $userId, spaceId: $spaceId, date: $date)
  }
`;

const Workspace = () => {
  const currentDate = new Date();

  const router = useRouter();
  const { uuid } = router.query;

  const { data, loading } = useQuery(GET_WORKSPACE, {
    variables: { id: uuid },
  });

  if (loading) return <Heading>Loading</Heading>;

  const workspace: WorkspaceDTO = data?.workspace;
  const spaces: Array<SpaceDTO> = data?.workspace?.spaces;

  const onBookSpaces = (spaceBooks: Array<SpaceBook>) => {
    spaceBooks.map((spaceBook) => {
      getDatesInRange(spaceBook.initialDate, spaceBook.finalDate).map(
        (date) => {
          useMutation(CREATE_BOOKING, {
            variables: { userId: '', spaceId: spaceBook.space.id, date: date },
          });
        },
      );
    });
  };

  function getDatesInRange(initialDate: Date, finalDate: Date): Date[] {
    const dates: Date[] = [];
    const totalDays = differenceInDays(finalDate, initialDate);

    for (let i = 0; i <= totalDays; i++) {
      const date = addDays(initialDate, i);
      dates.push(date);
    }

    return dates;
  }

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
          onBookSpaces={onBookSpaces}
        ></SpaceBookingPanel>
      </Box>
    </>
  );
};
export default Workspace;
