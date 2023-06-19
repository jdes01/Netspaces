import { Box, SimpleGrid, TabPanels, Tabs } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { useState } from 'react';

import { LocationFinder } from './locationFinder';
import { ServicesTabs } from './servicesTabs';
import { WorkspaceCard } from './workspaceCard';

type WorkspaceGridProps = {
	workspaces: WorkspaceDTO[];
};

export function WorkspaceGrid({ workspaces }: WorkspaceGridProps) {
	const [tabIndex, setTabIndex] = useState(0);
  
	const uniqueServices = uniqueServicesFromWorkspaces(workspaces);
	const filteredService = uniqueServices[tabIndex];
  
	const filteredWorkspaces = workspaces.filter((workspace) => workspace.services.includes(filteredService));
  
	return (
	  <>
		<LocationFinder />
		<Tabs onChange={(index) => setTabIndex(index)} mt={10}>
		  <ServicesTabs services={uniqueServices} />
		  <TabPanels marginTop={5}>
			<SimpleGrid minChildWidth={300} justifyItems={"center"}>
			  {filteredWorkspaces.map((workspace) => (
				<Box marginBottom={10}>
					<WorkspaceCard key={workspace._id} workspace={workspace}/>
				</Box>
			  ))}
			</SimpleGrid>
		  </TabPanels>
		</Tabs>
	  </>
	);
  }

function uniqueServicesFromWorkspaces(workspaces: Array<WorkspaceDTO>): Array<string> {
	const uniqueServicesSet = new Set<string>();

	workspaces.forEach((workspace) => {
		workspace.services.forEach((service) => {
			uniqueServicesSet.add(service);
		});
	});

	return Array.from(uniqueServicesSet);
}
