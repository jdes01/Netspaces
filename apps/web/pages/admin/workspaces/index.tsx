import { gql, useQuery } from '@apollo/client';
import { Badge, Box, Heading, Image, SimpleGrid, Stack, TabPanels, Tabs } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
		}
	}
`;

export function Index() {
	const router = useRouter();
	const [tabIndex, setTabIndex] = useState(0);

	const { data, loading } = useQuery(GET_WORKSPACES);

	if (loading) return <Heading>Loading</Heading>;

	const workspaces: Array<WorkspaceDTO> = data?.workspaces;

	const uniqueServices: string[] = uniqueServicesFromWorkspaces(workspaces);

	const filteredService = uniqueServices[tabIndex];

	return (
		<Box p="5" bg={'#FAF9F6'} m={[0, null, 5]}>
			<Tabs onChange={(index) => setTabIndex(index)} mt={10}>
				<TabPanels p="2rem">
					<SimpleGrid columns={[1, null, 6]}>
						{workspaces
							.filter((workspace) => workspace.services.includes(filteredService))
							.map((workspace) => (
								<Box
									m={1}
									onClick={() => router.push(`/admin/workspaces/${workspace._id}`)}
									borderRadius={20}
									borderColor={'transparent'}
									_hover={{ cursor: 'pointer', shadow: 'base' }}
								>
									<Image
										borderRadius={20}
										src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
									/>

									<Box p="5">
										<Stack direction="row" spacing={1} align="left">
											{workspace.services.map((service) => (
												<Badge
													borderRadius="full"
													px="2"
													colorScheme="teal"
													position={'relative'}
													left={1}
													right={1}
												>
													{service}
												</Badge>
											))}
										</Stack>

										<Box mt="4" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
											{workspace.name}
										</Box>

										<Box display="flex" alignItems="baseline" mt={2}>
											<Box
												color="gray.500"
												fontWeight="semibold"
												letterSpacing="wide"
												fontSize="xs"
												textTransform="uppercase"
											>
												{workspace.city}, {workspace.country}
											</Box>
										</Box>
									</Box>
								</Box>
							))}
					</SimpleGrid>
				</TabPanels>
			</Tabs>
		</Box>
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

export default Index;
