import { gql, useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Flex,
  HStack,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

const GET_USER_BOOKINGS = gql`
  query GetBookingsByUser($userId: String!) {
    getBookingsByUser(userId: $userId) {
      date
      spaceId
    }
  }
`;

const GET_SPACE = gql`
  query Space($spaceId: String!) {
    space(spaceId: $spaceId) {
      image
      name
    }
  }
`;

type BookingDTO = {
  date: string;
  spaceId: string;
};

interface UserEntity {
  id: string;
  picture: string;
}

export function Index() {
  const router = useRouter();

  const { data: userData } = useSWR<UserEntity>(
    'http://localhost:3333/api/auth/me',
    fetcher,
  );

  const me = useMemo(
    () => (userData ? (userData as UserEntity) : undefined),
    [userData],
  );

  const userId = me?.id;
  const { data, loading } = useQuery(GET_USER_BOOKINGS, {
    variables: { userId },
  });

  if (!me) return <Heading>Loading</Heading>;

  if (loading) return <Heading>Loading</Heading>;

  const bookings: Array<BookingDTO> = data?.getBookingsByUser ?? [];

  //   const bookingsSpacesIdsArray = [
  //     ...new Set(bookings.map((booking) => booking.spaceId)),
  //   ];

  //   bookingsSpacesIdsArray.forEach((spaceId) => {
  //     const { data } = useQuery(GET_SPACE, {
  //         variables: { spaceId },
  //       });

  //     const space = data?.space
  //   });

  return (
    <>
      <Flex
        align="center"
        justify="center"
        minH="100vh"
        maxH="200px"
        flexDirection="column"
      >
        <Box width={1500} height={500} mb={200}>
          <HStack gap={300} align="center" justifyContent="center" mx="auto">
            <Avatar src={me.picture} width={500} height={500}></Avatar>
            <Heading size={'4xl'}>Javier de Santiago</Heading>
          </HStack>
        </Box>
        <Box>
          <Heading>Reservas:</Heading>
          <Flex
            mt={2}
            direction="column"
            p={8}
            rounded={8}
            shadow="md"
            bg="white"
            width={1500}
            height={500}
            borderColor={'blackAlpha.400'}
            borderWidth={2}
            overflowY="auto"
          >
            <Grid height={'100%'} width={'100%'}>
              <VStack spacing={4} p={4}>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar
                        src={
                          'https://media.gettyimages.com/id/1157235072/video/comfortable-office-atmosphere.jpg?s=640x640&k=20&c=3HJV7KsAP62-3hGtgplR2cJX9nIMJ51BMSg9_FYwqic='
                        }
                      ></Avatar>
                      <Heading> Escritorio Individual</Heading>
                      <Heading> 11/12/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar
                        src={
                          'https://www.bravo.es/wp-content/uploads/2019/12/Caracter%C3%ADsticas-para-un-espacio-coworking-1480x740.jpg'
                        }
                      ></Avatar>
                      <Heading> Mesa para compartir</Heading>
                      <Heading> 12/12/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar
                        src={
                          'https://c1.wallpaperflare.com/preview/50/512/980/iocenters-meeting-room-kuwait-city.jpg'
                        }
                      ></Avatar>
                      <Heading> Sala de reuniones</Heading>
                      <Heading> 10/12/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar
                        src={
                          'https://c1.wallpaperflare.com/preview/50/512/980/iocenters-meeting-room-kuwait-city.jpg'
                        }
                      ></Avatar>
                      <Heading> Sala de reuniones</Heading>
                      <Heading> 11/12/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar
                        src={
                          'https://c1.wallpaperflare.com/preview/50/512/980/iocenters-meeting-room-kuwait-city.jpg'
                        }
                      ></Avatar>
                      <Heading> Sala de reuniones</Heading>
                      <Heading> 12/12/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar src={me.picture}></Avatar>
                      <Heading> Nombre de un espacio</Heading>
                      <Heading> 10/10/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    width={750}
                    borderRadius={50}
                    borderWidth={0.5}
                    borderColor={'gray.400'}
                    height={100}
                    display="flex"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={4}
                    paddingRight={4}
                    alignItems="center"
                  >
                    <HStack
                      gap={3}
                      align="center"
                      justifyContent="center"
                      mx="auto"
                    >
                      <Avatar src={me.picture}></Avatar>
                      <Heading> Nombre de un espacio</Heading>
                      <Heading> 10/10/2023 </Heading>
                    </HStack>
                  </Box>
                </GridItem>
              </VStack>
            </Grid>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Index;
