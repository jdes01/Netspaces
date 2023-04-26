import { useRouter } from 'next/router';
import { Box, Heading } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';

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
		}
	}
`;

const Workspace = () => {
	const router = useRouter();
	const { uuid } = router.query;

	const { loading, error, data } = useQuery(GET_WORKSPACE, {
		variables: { id: uuid },
	});

	if (loading) return <Heading>Loading</Heading>;

	console.debug(error);

	return (
		<Box p={5} bgColor={'black'}>
			<Heading size="2xl" color={'white'} textAlign={'center'} mt={10}>
				{data?.workspace.name}
			</Heading>
		</Box>
	);
};

export default Workspace;
