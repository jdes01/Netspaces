import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import { SpaceDTO } from '@netspaces/contracts';

type SpaceCardProps = {
	space: SpaceDTO;
};

export function SpaceCard({ space }: SpaceCardProps) {
	return (
		<Box m={1} borderRadius={20} borderColor={'transparent'} _hover={{ cursor: 'pointer', shadow: 'base' }}>
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
			</Box>
		</Box>
	);
}
