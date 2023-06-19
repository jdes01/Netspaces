import { gql, useQuery } from '@apollo/client';
import { Box, Heading, SimpleGrid, Image, Text, Divider, HStack, VStack, List, ListItem, ListIcon, Icon, IconButton, Flex } from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

import { SpaceCard } from '../../components/workspacesPage/workspaceSpaces/spaceCard';
import { FaWifi } from 'react-icons/fa';
import { useState } from 'react';


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

const Workspace = () => {
	const [startDate, setStartDate] = useState(new Date())
	const router = useRouter();
	const { uuid } = router.query;

	const { data, loading } = useQuery(GET_WORKSPACE, {
		variables: { id: uuid },
	});

	if (loading) return <Heading>Loading</Heading>;

	const workspace: WorkspaceDTO = data?.workspace;
	const spaces: Array<SpaceDTO> = data?.workspace?.spaces;

	return (
		<>
		<Box padding={5} display={"block"} justifyContent={"center"} maxWidth={1200} margin={"auto"}>

			<Box fontWeight={"semibold"} width={"100%"}  height={100} >
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
				

			<Divider marginTop={3}/>

			<Box width={"100%"} marginTop={5}>
				<HStack overflowX="auto" margin={"auto"}>
					<Image borderRadius={20} margin={"auto"} src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg" />
					<Image borderRadius={20} margin={"auto"} src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg" />
					<Image borderRadius={20} margin={"auto"} src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg" />
				</HStack>
			</Box>

			<Box
				marginTop={5}
				padding={5}
				borderColor={"blackAlpha.100"}
				borderRadius={20}
				borderWidth={2}
				width={"100%"}
				height={"fit-content"}
			>
				<Text fontWeight="semibold" fontSize="xs" textTransform="uppercase" left={0} top={0} marginBottom={3}>
						Services:
				</Text>
				<SimpleGrid columns={2}>
					{workspace.services.map(
						(service) => (
							<Flex alignItems="center">
								<FaWifi></FaWifi> 
								<Box marginLeft={3} width={"100%"} borderRadius={20}>
									{service}
								</Box>
							</Flex>
						)
					)}
				</SimpleGrid>
			</Box>

			<Box
				marginTop={5}
				padding={5}
				borderColor={"blackAlpha.100"}
				borderRadius={20}
				borderWidth={2}
				width={"100%"}
				height={"fit-content"}
			>
				<Text fontWeight="semibold" fontSize="xs" textTransform="uppercase" left={0} top={0} marginBottom={3}>
					{workspace.description}
				</Text>
			</Box>


			<Box marginTop={5}>
				<Box>
					<Text fontWeight="semibold" letterSpacing="wide" fontSize="md" textTransform="uppercase">
						Spaces:
					</Text>
				</Box>
				<Box width={"100%"}>
					<HStack overflowX="auto" mt={4} pb={2}>
						{spaces.map((space) => (
							<SpaceCard space={space}></SpaceCard>
						))}
					</HStack>
				</Box>
			</Box>

		</Box>
		</>
	);
};

export default Workspace;
