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
	SimpleGrid,
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import { SpaceDTO, WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsBuildingFillAdd } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import { WorkspaceCard } from '../../../components/workspacesPage/workspaceCard';
import { SpaceCard } from '../../../components/workspacesPage/workspaceSpaces/spaceCard';

const CREATE_SPACE_MUTATION = gql`
	mutation CreateSpaceMutation($_id: String!, $workspaceId: String!, $name: String!, $quantity: Int!, $seats: Int!, $amenitys: [String!]!) {
		createSpace(spaceInput: { _id: $_id, workspaceId: $workspaceId, name: $name, quantity: $quantity, seats: $seats, amenitys: $amenitys })
	}
`;

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
	const [formName, setFormName] = useState('');
	const [formQuantity, setFormQuantity] = useState(0);
	const [formSeats, setFormSeats] = useState(0);

	const [createSpace] = useMutation(CREATE_SPACE_MUTATION);

	const { isOpen, onClose, onOpen } = useDisclosure();

	const router = useRouter();
	const { uuid } = router.query;

	const { data, loading } = useQuery(GET_WORKSPACE, {
		variables: { id: uuid },
	});

	if (loading) return <Heading>Loading</Heading>;

	const workspace: WorkspaceDTO = data?.workspace;
	const spaces: Array<SpaceDTO> = data?.workspace?.spaces;

	const handleSubmit = () => {
		createSpace({
			variables: {
				_id: uuidv4(),
				amenitys: ['AUDIO_RECORDING'],
				name: formName,
				quantity: formQuantity,
				seats: formSeats,
				workspaceId: workspace._id,
			},
		});
		router.reload(window.location.pathname);
	};

	return (
		<>
			<Box m={1} borderRadius={20} borderColor={'transparent'}>
				<Box p={5}>
					<WorkspaceCard workspace={workspace}></WorkspaceCard>
					<SimpleGrid columns={[1, null, 6]}>
						{spaces.map((space) => (
							<SpaceCard space={space}></SpaceCard>
						))}
					</SimpleGrid>
					<HStack position="fixed" bottom={10} left={10}>
						<IconButton aria-label="toggle theme" rounded="full" size="lg" onClick={() => onOpen()} icon={<BsBuildingFillAdd />} />
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
									<FormLabel>Quantity</FormLabel>
									<Input onChange={(e) => setFormQuantity(+e.target.value)} />
								</FormControl>
								<FormControl isRequired mt={4}>
									<FormLabel>Seats</FormLabel>
									<Input onChange={(e) => setFormSeats(+e.target.value)} />
								</FormControl>
								<FormControl isRequired mt={4}>
									<FormLabel>Amenities</FormLabel>
									<Stack spacing={5} direction="row">
										<Checkbox defaultChecked isDisabled>
											AUDIO_RECORDING
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
									Create Space
								</Button>
								<Button colorScheme="gray" onClick={onClose}>
									Close
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Box>
			</Box>
		</>
	);
};

export default Workspace;
