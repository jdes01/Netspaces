import { Box, SimpleGrid, TabPanels, Tabs, Heading } from '@chakra-ui/react';
import { WorkspaceDTO } from '../../../../../contracts';
import { useMemo, useState } from 'react';

import { LocationFinder } from '../LocationFinder';
import { ServicesTabs } from '../ServicesTabs';
import { WorkspaceCard } from '../WorkspaceCard';
import useSWR from 'swr';
import React from 'react';

type WorkspaceGridProps = {
  workspaces: WorkspaceDTO[];
  onWorkspaceCardClickRoute: string;
};

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

interface UserEntity {
  name: string;
}

export function WorkspaceGrid({
  workspaces,
  onWorkspaceCardClickRoute,
}: WorkspaceGridProps) {
  const [selectedCity, setSelectedCity] = useState<String | undefined>(
    undefined,
  );
  const [tabIndex, setTabIndex] = useState(0);

  const uniqueServices = uniqueServicesFromWorkspaces(workspaces);
  const filteredService = uniqueServices[tabIndex];

  const cityFilteredWorkspaces = selectedCity
    ? workspaces.filter(
        (workspace) =>
          workspace.city.toLowerCase() == selectedCity.toLowerCase(),
      )
    : workspaces;

  const filteredWorkspaces = cityFilteredWorkspaces.filter((workspace) =>
    workspace.services.includes(filteredService),
  );

  const { data } = useSWR<UserEntity>(
    'http://localhost:3333/api/auth/me',
    fetcher,
  );

  const me = useMemo(() => (data ? (data as UserEntity) : undefined), [data]);

  return (
    <>
      <Heading>{`Welcome back ${me?.email}`}</Heading>
      <LocationFinder onSelect={setSelectedCity} />
      <Tabs onChange={(index) => setTabIndex(index)} mt={10}>
        <ServicesTabs services={uniqueServices} />
        <TabPanels marginTop={5}>
          <SimpleGrid minChildWidth={300} justifyItems={'center'}>
            {filteredWorkspaces.map((workspace) => (
              <Box marginBottom={10}>
                <WorkspaceCard
                  key={workspace._id}
                  workspace={workspace}
                  onWorkspaceCardClickRoute={onWorkspaceCardClickRoute}
                />
              </Box>
            ))}
          </SimpleGrid>
        </TabPanels>
      </Tabs>
    </>
  );
}

function uniqueServicesFromWorkspaces(
  workspaces: Array<WorkspaceDTO>,
): Array<string> {
  const uniqueServicesSet = new Set<string>();

  workspaces.forEach((workspace) => {
    workspace.services.forEach((service) => {
      uniqueServicesSet.add(service);
    });
  });

  return Array.from(uniqueServicesSet);
}
