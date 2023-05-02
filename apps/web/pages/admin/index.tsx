import { Box, Button, Heading, IconButton, SimpleGrid, Stack, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaMoon, FaSun } from 'react-icons/fa';

export function Index() {
	const router = useRouter();

	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box position="relative" h="100vh">
			<SimpleGrid columns={1}>
				<Box m={'auto'} mt={100}>
					<Heading size="2xl" colorScheme="pink">
						Welcome to Netspaces Admin Panel!
					</Heading>
				</Box>
				<Box m={'auto'} mt={10}>
					<Stack direction="row" spacing={10} align="center">
						<Button colorScheme="teal" onClick={() => router.push('http://localhost:3000/workspaces')}>
							Register
						</Button>
						<Button
							colorScheme="teal"
							variant="ghost"
							onClick={() => router.push('http://localhost:3000/workspaces')}
						>
							Log in
						</Button>
					</Stack>
				</Box>
				<IconButton
					aria-label="toggle theme"
					rounded="full"
					size="md"
					position="absolute"
					bottom={4}
					left={4}
					onClick={toggleColorMode}
					icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
				/>
			</SimpleGrid>
		</Box>
	);
}

export default Index;
