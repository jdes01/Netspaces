import { gql, useQuery } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceGrid } from '@netspaces/ui';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

const GET_WORKSPACES = gql`
  query GetWorkspaces {
    workspaces {
      _id
      name
      description
      street
      city
      country
      services
      images
    }
  }
`;

interface UserEntity {
  name: string;
  email: string;
}

export function Index() {
  const { data, loading } = useQuery(GET_WORKSPACES);

  const workspaces: Array<WorkspaceDTO> = data?.workspaces;

  const { data: userData } = useSWR<UserEntity>(
    'http://localhost:3333/api/auth/me',
    fetcher,
  );

  const me = useMemo(
    () => (userData ? (userData as UserEntity) : undefined),
    [userData],
  );

  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push('http://localhost:3000/');
    }
  }, [me, router]);

  if (loading) return <Heading>Loading</Heading>;

  if (!me) return null;

  return (
    <Box p="5" m={[0, null, 5]}>
      <WorkspaceGrid
        workspaces={workspaces}
        onWorkspaceCardClickRoute={'/workspaces/'}
      ></WorkspaceGrid>
    </Box>
  );
}

export default Index;
