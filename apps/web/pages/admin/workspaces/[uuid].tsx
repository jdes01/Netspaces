import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Image, Text, Divider, HStack } from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

import { CreateSpaceForm, SpaceBook, SpaceBookingPanel } from '@netspaces/ui';
import { addDays, differenceInDays } from 'date-fns';

import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

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
        image
      }
      images
    }
  }
`;

const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking(
    $userMail: String!
    $spaceId: String!
    $date: String!
  ) {
    createBooking(
      bookingInput: { userMail: $userMail, spaceId: $spaceId, date: $date }
    )
  }
`;

const CREATE_SPACE_MUTATION = gql`
  mutation CreateSpaceMutation(
    $_id: String!
    $workspaceId: String!
    $name: String!
    $quantity: Int!
    $seats: Int!
    $amenitys: [String!]!
    $image: String!
  ) {
    createSpace(
      spaceInput: {
        _id: $_id
        workspaceId: $workspaceId
        name: $name
        quantity: $quantity
        seats: $seats
        amenitys: $amenitys
        image: $image
      }
    )
  }
`;

interface UserEntity {
  id: string;
}

const Workspace = () => {
  const router = useRouter();
  const [createBookingMutation] = useMutation(CREATE_BOOKING_MUTATION);

  const emptyList: Array<string> = [];
  const [formName, setFormName] = useState('');
  const [formQuantity, setFormQuantity] = useState(0);
  const [formSeats, setFormSeats] = useState(0);
  const [formAmenitys, setFormAmenitys] = useState(emptyList);
  const [formImage, setFormImage] = useState('');

  const [createSpace] = useMutation(CREATE_SPACE_MUTATION);

  const handleSubmit = async () => {
    try {
      await createSpace({
        variables: {
          _id: uuidv4(),
          amenitys: formAmenitys,
          name: formName,
          quantity: formQuantity,
          seats: formSeats,
          workspaceId: workspace._id,
          image: formImage,
        },
      });

      // Wait for the createSpace mutation to complete
      await router.reload(window.location.pathname);
    } catch (error) {
      console.error('Error creating space:', error);
    }
  };

  const { data: userData } = useSWR<UserEntity>(
    'http://localhost:3333/api/auth/me',
    fetcher,
  );

  const me = useMemo(
    () => (userData ? (userData as UserEntity) : undefined),
    [userData],
  );

  if (me?.message === 'Unauthorized') {
    router.push('http://localhost:3000/admin');
  }

  const {
    query: { uuid },
  } = router;

  const { data, loading } = useQuery(GET_WORKSPACE, {
    variables: { id: uuid },
  });

  if (loading) return <Heading>Loading</Heading>;

  const workspace: WorkspaceDTO = data?.workspace;
  const spaces: Array<SpaceDTO> = data?.workspace?.spaces;

  const onBookSpaces = async (spaceBooks: Array<SpaceBook>) => {
    for (const spaceBook of spaceBooks) {
      const datesInRange = getDatesInRange(
        spaceBook.initialDate,
        spaceBook.finalDate,
      );

      for (const date of datesInRange) {
        try {
          await createBookingMutation({
            variables: {
              userMail: me?.email,
              spaceId: spaceBook.space.id,
              date: date.toISOString(),
            },
          });
        } catch (error) {
          // Handle any errors that might occur during the mutation
          console.error('Error creating booking:', error);
        }
      }
    }
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

  if (!workspace || !me) {
    return <Heading>Loading</Heading>;
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
              width={'500'}
              height={'500'}
              borderRadius={20}
              margin={'auto'}
              src={workspace.images[0]}
            />
            <Image
              width={'500'}
              height={'500'}
              borderRadius={20}
              margin={'auto'}
              src={workspace.images[1]}
            />
            <Image
              width={'500'}
              height={'500'}
              borderRadius={20}
              margin={'auto'}
              src={workspace.images[2]}
            />
          </HStack>
        </Box>

        <SpaceBookingPanel
          spaces={spaces}
          workspace={workspace}
          onBookSpaces={onBookSpaces}
        ></SpaceBookingPanel>

        <CreateSpaceForm
          handleSubmit={handleSubmit}
          setFormName={setFormName}
          setFormQuantity={setFormQuantity}
          setFormSeats={setFormSeats}
          setFormAmenitys={setFormAmenitys}
          setFormImage={setFormImage}
          formAmenitys={formAmenitys}
        />
      </Box>
    </>
  );
};
export default Workspace;
