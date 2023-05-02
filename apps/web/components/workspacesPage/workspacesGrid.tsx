import { SimpleGrid, TabPanels, Tabs } from '@chakra-ui/react';
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

	const uniqueServices: string[] = uniqueServicesFromWorkspaces(workspaces);
	const filteredService = uniqueServices[tabIndex];

	const filteredWorkspaces = workspaces.filter((workspace) => workspace.services.includes(filteredService));

	return (
		<>
			<LocationFinder></LocationFinder>
			<Tabs onChange={(index) => setTabIndex(index)} mt={10}>
				<ServicesTabs services={uniqueServices}></ServicesTabs>
				<TabPanels p="2rem">
					<SimpleGrid columns={[1, null, 6]}>
						{filteredWorkspaces.map((workspace) => (
							<WorkspaceCard workspace={workspace}></WorkspaceCard>
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
