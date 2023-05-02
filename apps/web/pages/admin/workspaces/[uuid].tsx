import { gql, useQuery } from '@apollo/client';
import { Badge, Box, Heading, Image, SimpleGrid, Stack } from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

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
				amenities
			}
		}
	}
`;

const Workspace = () => {
	const router = useRouter();
	const { uuid } = router.query;

	const { data, loading } = useQuery(GET_WORKSPACE, {
		variables: { id: uuid },
	});

	if (loading) return <Heading>Loading</Heading>;

	const workspace: WorkspaceDTO = data?.workspace;
	const spaces: Array<SpaceDTO> = data?.workspace?.spaces;

	return (
		<Box m={1} borderRadius={20} borderColor={'transparent'}>
			<Image
				borderRadius={20}
				src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
			/>

			<Box p={5}>
				<Stack direction="row" spacing={1} align="left">
					{workspace.services.map((service) => (
						<Badge borderRadius="full" px="2" colorScheme="teal" position={'relative'} left={1} right={1}>
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
				<SimpleGrid columns={[1, null, 6]}>
					{spaces.map((space) => (
						<Box
							m={1}
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
									{space.amenities.map((amenity) => (
										<Badge
											borderRadius="full"
											px="2"
											colorScheme="teal"
											position={'relative'}
											left={1}
											right={1}
										>
											{amenity}
										</Badge>
									))}
								</Stack>

								<Box mt="4" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
									{space.name}
								</Box>

								<Box display="flex" alignItems="baseline" mt={2}>
									<Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs">
										<Badge
											borderRadius="full"
											px="2"
											colorScheme="teal"
											position={'relative'}
											mr={3}
											left={1}
										>
											{space.seats} seats
										</Badge>
										{space.quantity} left
									</Box>
								</Box>
							</Box>
						</Box>
					))}
				</SimpleGrid>
			</Box>
		</Box>
	);
};

export default Workspace;
