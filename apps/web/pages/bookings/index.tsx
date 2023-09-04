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
      <Box p="8">
        <HStack gap={3}>
          <Avatar src={me.picture}></Avatar>
          <Heading> welcome back Javier!</Heading>
        </HStack>
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Box
            mt={200}
            textAlign="center"
            borderRadius={20}
            borderWidth={0.5}
            width="90%"
            maxWidth="2000"
            height={1000}
          >
            <Flex padding={5}>
              <Heading> Bookings:</Heading>
            </Flex>
            <Grid height={'100%'} width={'100%'}>
              <GridItem>
                <Box
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
                  borderRadius={20}
                  borderWidth={0.5}
                  height={100}
                  display="flex"
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
            </Grid>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Index;
