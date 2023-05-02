import { Box, FormControl, HStack, IconButton, Select } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

export function LocationFinder() {
	return (
		<Box m={1} p={1} borderRadius={20} borderColor={'transparent'} shadow={'base'}>
			<FormControl borderColor={'transparent'}>
				<HStack>
					<IconButton
						aria-label="search location"
						rounded="full"
						size="md"
						icon={<FiMapPin />}
						bg={'#FAF9F6'}
					/>
					<Select placeholder="Select country" borderColor={'transparent'} focusBorderColor="transparent">
						<option>United Arab Emirates</option>
						<option>Nigeria</option>
					</Select>
				</HStack>
			</FormControl>
		</Box>
	);
}
