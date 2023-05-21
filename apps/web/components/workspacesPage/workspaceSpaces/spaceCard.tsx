import { Badge, Box, Button, Heading, IconButton, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import { SpaceDTO } from '@netspaces/contracts';
import { useState } from 'react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { gql, useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { useRouter } from 'next/router';


const GET_SPACE_UNAVAILABLE_DATES = gql`
	query GetSpaceUnavailableDates($spaceId: String!) {
		getSpaceUnavailableDates(spaceId: $spaceId)
	}
`;


const CREATE_BOOKING_MUTATION = gql`
	mutation CreateBooking(
		$userId: String!
		$spaceId: String!
		$date: String!
	) {
		createBooking(
			bookingInput: {
				userId: $userId
				spaceId: $spaceId
				date: $date
			}
		)
	}
`;


type SpaceCardProps = {
	space: SpaceDTO;
};


export function SpaceCard({ space }: SpaceCardProps) {
	const router = useRouter();
	const [spaceId] = useState(space._id)
	const currentDate = new Date()
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [createBooking] = useMutation(CREATE_BOOKING_MUTATION);
	const { isOpen, onClose, onOpen } = useDisclosure();

	const { loading, serializedBookedDates} = getPageData(spaceId)

	if (loading) return <Heading>Loading</Heading>;


	const bookedDates = serializedBookedDates.length ? serializedBookedDates.map((serializedBookedDate) => {
		const [day, month, year] = serializedBookedDate.split('-');
		const dateObject = new Date(Number(year), Number(month) - 1, Number(day));
		return new Date(dateObject).getTime()
	}) : []

	const handleSubmit = () => {
		const date = format(selectedDate, 'dd-MM-yyyy')
		console.log(date)
		console.log(spaceId)
		
		createBooking({
			variables: {
				userId: `23079366-ca99-4351-b3dc-4f4db2255372`,
				spaceId: spaceId,
				date: date,
			},
		});
		router.reload(window.location.pathname);
	}
	
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
					    		  disabledDates={new Set(bookedDates)}
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

	// const bookedDates = serializedBookedDates.map((serializedBookedDate) => new Date(serializedBookedDate).getTime())

	return { loading, serializedBookedDates }
}

function getBookedDates(spaceId: string){
	const { data, loading } = useQuery(GET_SPACE_UNAVAILABLE_DATES, {
		variables: { spaceId },
	});
	const serializedBookedDates: Array<string> = data?.getSpaceUnavailableDates;
	return { loading, serializedBookedDates };
}