import { gql, useMutation, useQuery } from '@apollo/client';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import { WorkspaceGrid } from '../../../components/workspacesPage/workspacesGrid';

const GET_WORKSPACES_BY_OWNER_ID = gql`
	query GetWorkspacesByOwnerId($id: String!) {
		workspacesByOwnerId(id: $id) {
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

const GET_USER_NAME = gql`
	query GetUser($id: String!) {
		user(id: $id) {
			name
		}
	}
`;

const CREATE_WORKSPACE_MUTATION = gql`
	mutation CreateWorkspaceMutation(
		$_id: String!
		$owner: String!
		$name: String!
		$description: String!
		$street: String!
		$city: String!
		$country: String!
		$services: [String!]!
	) {
		createWorkspace(
			workspaceInput: {
				_id: $_id
				owner: $owner
				name: $name
				description: $description
				street: $street
				city: $city
				country: $country
				services: $services
			}
		)
	}
`;

type Props = {
	userId: string;
};

export function Index({ userId }: Props) {
	const router = useRouter();

	const [createWorkspace] = useMutation(CREATE_WORKSPACE_MUTATION);

	const [formName, setFormName] = useState('');
	const [formDescription, setFormDescription] = useState('');
	const [formStreet, setFormStreet] = useState('');
	const [formCity, setFormCity] = useState('');
	const [formCountry, setFormCountry] = useState('');

	const { isOpen, onClose, onOpen } = useDisclosure();

	const { loading, userName, workspaces } = getPageData(userId);

	if (loading) return <Heading>Loading</Heading>;

	const handleSubmit = () => {
		createWorkspace({
			variables: {
				_id: uuidv4(),
				city: formCity,
				country: formCountry,
				description: formDescription,
				name: formName,
				owner: userId,
				services: ['WIFI'],
				street: formStreet,
			},
		});
		router.reload(window.location.pathname);
	};

	return (
		<>
			<Box p="5" bg={'#FAF9F6'} m={[0, null, 5]}>
				<WorkspaceGrid workspaces={workspaces}></WorkspaceGrid>
				<HStack position="fixed" bottom={10} left={10}>
					<IconButton aria-label="toggle theme" rounded="full" size="lg" onClick={() => onOpen()} icon={<BsBuildingFillAdd />} />
					<Box pl={5} bgColor={'#FAF9F6'} borderColor={'black'} rounded={70}>
						<Text fontSize={'xl'}>Welcome {userName}</Text>
					</Box>
				</HStack>

				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent pb={6}>
						<ModalHeader>Create Workspace</ModalHeader>
						<ModalBody>
							<FormControl isRequired>
								<FormLabel>Name</FormLabel>
								<Input onChange={(e) => setFormName(e.target.value)} />
							</FormControl>
							<FormControl isRequired mt={4}>
								<FormLabel>Description</FormLabel>
								<Input onChange={(e) => setFormDescription(e.target.value)} />
							</FormControl>
							<FormControl isRequired mt={4}>
								<FormLabel>Street</FormLabel>
								<Input onChange={(e) => setFormStreet(e.target.value)} />
							</FormControl>
							<FormControl isRequired mt={4}>
								<FormLabel>City</FormLabel>
								<Input onChange={(e) => setFormCity(e.target.value)} />
							</FormControl>
							<FormControl isRequired mt={4}>
								<FormLabel>Country</FormLabel>
								<Input onChange={(e) => setFormCountry(e.target.value)} />
							</FormControl>
							<FormControl isRequired mt={4}>
								<FormLabel>Country</FormLabel>
								<Stack spacing={5} direction="row">
									<Checkbox defaultChecked isDisabled>
										WIFI
									</Checkbox>
								</Stack>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={() => {
									handleSubmit();
									onClose();
								}}
							>
								Create Workspace
							</Button>
							<Button colorScheme="gray" onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	);
}

function getPageData(userId: string) {
	const { userName } = getUserName(userId);
	const { loading, workspaces } = getWorkspaces(userId);

	return { loading, userName, workspaces };
}

function getWorkspaces(id: string) {
	const { data, loading } = useQuery(GET_WORKSPACES_BY_OWNER_ID, {
		variables: { id },
	});
	const workspaces: Array<WorkspaceDTO> = data?.workspacesByOwnerId;
	return { loading, workspaces };
}

function getUserName(id: string) {
	const { data } = useQuery(GET_USER_NAME, {
		variables: { id },
	});
	const userName: string = data?.user.name;
	console.log(userName)
	return { userName };
}

export async function getServerSideProps() {
	const userId: string | null = `${process.env.ADMIN_UUID}`;

	return {
		props: { userId },
	};
}

export default Index;
