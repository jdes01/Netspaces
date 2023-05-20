import { Badge, Box, Button, IconButton, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import { SpaceDTO } from '@netspaces/contracts';
import { useState } from 'react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_SPACE_UNAVAILABLE_DATES = gql`
	query GetSpaceUnavailableDates($spaceId: String!) {
		getSpaceUnavailableDates(spaceId: $spaceId)
	}
`;


type SpaceCardProps = {
	space: SpaceDTO;
};

function handleSubmit(){
	console.log("booking requested!")
}


export function SpaceCard({ space }: SpaceCardProps) {

	// const bookedDates = [new Date(2023, 4, 29).getTime()]
	const { bookedDates } = getPageData(space._id)
	const [selectedDate, setSelectedDate] = useState([]);

	const [disabledDates] = useState(bookedDates);
	const { isOpen, onClose, onOpen } = useDisclosure();
	
	return (
		<Box m={1} borderRadius={20} borderColor={'transparent'} _hover={{ cursor: 'pointer', shadow: 'base' }} onClick={() => onOpen()}>
			<Image
				borderRadius={20}
				src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
			/>

			<Box p="5">
				<Stack direction="row" spacing={1} align="left">
					{space.amenities.map((amenity) => (
						<Badge borderRadius="full" px="2" colorScheme="teal" position={'relative'} left={1} right={1}>
							{amenity}
						</Badge>
					))}
				</Stack>


					<Box mt="4" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
						{space.name}
					</Box>
						
					<Box display="flex" alignItems="baseline" mt={2}>
						<Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs">
							<Badge borderRadius="full" px="2" colorScheme="teal" position={'relative'} mr={3} left={1}>
								{space.seats} seats
							</Badge>
							{space.quantity} left
						</Box>
					</Box>
						
						
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent pb={6}>
						<ModalHeader>Book space!</ModalHeader>
						<ModalBody>
							<Box m={5} pb={300}>
								<SingleDatepicker
								  defaultIsOpen={true}
								  date={selectedDate}
  								  onDateChange={setSelectedDate}
					    		  disabledDates={new Set(disabledDates)}
								  closeOnSelect={false}
  								/>
							</Box>
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
									Book Space!
								</Button>
								<Button colorScheme="gray" onClick={onClose}>
									Close
								</Button>
							</ModalFooter>
					</ModalContent>
				</Modal>

			</Box>
		</Box>
	);
}

function getPageData(spaceId: string) {

	const { loading, serializedBookedDates } = getBookedDates(spaceId)

	const bookedDates = serializedBookedDates.map((serializedBookedDate) => new Date(serializedBookedDate).getTime())

	return { loading, bookedDates }
}

function getBookedDates(spaceId: string){
	const { data, loading } = useQuery(GET_SPACE_UNAVAILABLE_DATES, {
		variables: { spaceId },
	});
	const serializedBookedDates: Array<string> = data?.getSpaceUnavailableDates;
	return { loading, serializedBookedDates };
}