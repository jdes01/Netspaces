import { gql, useQuery } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';

import { WorkspaceGrid } from '../../components/workspacesPage/workspacesGrid';

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
	const { data, loading } = useQuery(GET_WORKSPACES);
	if (loading) return <Heading>Loading</Heading>;

	const workspaces: Array<WorkspaceDTO> = data?.workspaces;

	return (
		<Box p="5" bg={'#FAF9F6'} m={[0, null, 5]}>
			<WorkspaceGrid workspaces={workspaces}></WorkspaceGrid>
		</Box>
	);
}

export default Index;
