import { gql, useQuery } from '@apollo/client';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

import { WorkspaceCard } from '../../components/workspacesPage/workspaceCard';
import { SpaceCard } from '../../components/workspacesPage/workspaceSpaces/spaceCard';

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
			<Box p={5}>
				<WorkspaceCard workspace={workspace}></WorkspaceCard>
				<SimpleGrid columns={[1, null, 6]}>
					{spaces.map((space) => (
						<SpaceCard space={space}></SpaceCard>
					))}
				</SimpleGrid>
			</Box>
		</Box>
	);
};

export default Workspace;
