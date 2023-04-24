import {
	Badge,
	Box,
	FormControl,
	Icon,
	Image,
	Select,
	SimpleGrid,
	HStack,
	Stack,
	IconButton,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { gql } from '@apollo/client';
import client from 'apps/web/apollo-client';
import { FiMapPin } from 'react-icons/fi';
import { useState } from 'react';

type Props = {
	workspaces: Array<WorkspaceDTO>;
};

export function Index({ workspaces }: Props) {
	const uniqueServices: string[] = uniqueServicesFromWorkspaces(workspaces);

	const [tabIndex, setTabIndex] = useState(0);
	const service = uniqueServices[tabIndex];

	return (
		<Box p="5" bg={'#FAF9F6'} m={[0, null, 5]}>
			<Box m={1} p={1} borderRadius={20} borderColor={'transparent'} shadow={'base'}>
				<FormControl borderColor={'transparent'}>
					<HStack>
						<IconButton
							aria-label="search location"
							rounded="full"
							size="md"
							icon={<FiMapPin />}
							bg={'#FAF9F6'}
						/>
						<Select placeholder="Select country" borderColor={'transparent'} focusBorderColor="transparent">
							<option>United Arab Emirates</option>
							<option>Nigeria</option>
						</Select>
					</HStack>
				</FormControl>
			</Box>
			<Tabs onChange={(index) => setTabIndex(index)} mt={10}>
				<TabList>
					{uniqueServices.map((service) => (
						<Tab>{service}</Tab>
					))}
				</TabList>
				<TabPanels p="2rem">
					<SimpleGrid columns={[1, null, 6]}>
						{workspaces
							.filter((workspace) => workspace.services.includes(service))
							.map((workspace) => (
								<Box m={1}>
									<Image
										borderRadius={20}
										src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
									/>

									<Box p="5">
										<Stack direction="row" spacing={1} align="left">
											{workspace.services.map((service) => (
												<Badge borderRadius="full" px="2" colorScheme="teal">
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

export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
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
		`,
	});

	console.log(data);

	const workspaces: Array<WorkspaceDTO> = data?.workspaces;

	return {
		props: {
			workspaces,
		},
	};
}

export default Index;
