import { gql, useMutation, useQuery } from '@apollo/client';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	HStack,
	Input,
	Text,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import React, { useState } from 'react';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import { WorkspaceGrid } from '../../../components/workspacesPage/workspacesGrid';
import { useRouter } from 'next/router';

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

export function Index() {
	const router = useRouter();

	const [createWorkspace] = useMutation(CREATE_WORKSPACE_MUTATION);

	const [formName, setFormName] = useState('');
	const [formDescription, setFormDescription] = useState('');
	const [formStreet, setFormStreet] = useState('');
	const [formCity, setFormCity] = useState('');
	const [formCountry, setFormCountry] = useState('');

	const { isOpen, onClose, onOpen } = useDisclosure();

	const userId: string | null = localStorage.getItem('userId');

	if (typeof userId !== 'string') router.push('http://localhost:3000/admin');

	const { workspaces, userName, loading } = getPageData(userId);

	if (loading) return <Heading>Loading</Heading>;

	const handleSubmit = () => {
		createWorkspace({
			variables: {
				_id: uuidv4(),
				owner: localStorage.getItem('userId'),
				name: formName,
				description: formDescription,
				street: formStreet,
				city: formCity,
				country: formCountry,
				services: ['WIFI'],
			},
		});
		router.reload(window.location.pathname);
	};

	return (
		<>
			<Box p="5" bg={'#FAF9F6'} m={[0, null, 5]}>
				<WorkspaceGrid workspaces={workspaces}></WorkspaceGrid>
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
			<Box display="flex" alignItems="baseline" mt={2}>
				<IconButton
					aria-label="toggle theme"
					rounded="full"
					size="lg"
					position="fixed"
					bottom={10}
					left={10}
					onClick={() => onOpen()}
					icon={<BsBuildingFillAdd />}
				/>
				<Text pl={50} position="fixed" bottom={50} left={50} fontSize={'xl'}>
					Welcome {userName}
				</Text>
			</Box>
		</>
	);
}

function getPageData(userId: string) {
	const { userName } = getUserName(userId);
	const { workspaces, loading } = getWorkspaces();

	return { workspaces, userName, loading };
}

function getWorkspaces() {
	const { data, loading } = useQuery(GET_WORKSPACES);
	const workspaces: Array<WorkspaceDTO> = data?.workspaces;
	return { workspaces, loading };
}

function getUserName(id: string) {
	const { data } = useQuery(GET_USER_NAME, {
		variables: { id },
	});
	const userName: string = data?.user.name;
	return { userName };
}

export default Index;
