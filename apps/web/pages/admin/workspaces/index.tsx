import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import { WorkspaceGrid } from '../../../components/workspacesPage/workspacesGrid';

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

function getCreateWorkspaceMutation(name: string) {
	const uuid = uuidv4();

	return gql`
	mutation {
		createWorkspace(
			workspaceInput: {
				_id: "${uuid}"
				name: "${name}"
				description: "las mejores de majalahonda"
				street: "calle chota"
				city: "majalahonda"
				country: "Puerto Rico"
				services: ["WIFI", "COFFEE", "PRINTER"]
			}
		)
	}
`;
}

export function Index() {
	const [createWorkspace] = useMutation(getCreateWorkspaceMutation('illo'));

	const { data, loading } = useQuery(GET_WORKSPACES);

	if (loading) return <Heading>Loading</Heading>;

	const workspaces: Array<WorkspaceDTO> = data?.workspaces;

	return (
		<>
			<Box p="5" bg={'#FAF9F6'} m={[0, null, 5]}>
				<WorkspaceGrid workspaces={workspaces}></WorkspaceGrid>
				<IconButton
					aria-label="toggle theme"
					rounded="full"
					size="lg"
					position="fixed"
					bottom={10}
					left={10}
					onClick={() => createWorkspace({ variables: { name: 'illo' } })}
					icon={<BsBuildingFillAdd />}
				/>
			</Box>
		</>
	);
}

export default Index;
