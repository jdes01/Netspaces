import { Badge, Box, Image, SimpleGrid, Stack } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';

type Props = {
	workspaces: Array<WorkspaceDTO>;
};

export function Index({ workspaces }: Props) {
	return (
		<SimpleGrid columns={[2, null, 6]} m={3} mt={100}>
			{workspaces.map((workspace) => (
				<Box m={2}>
					<Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />

					<Box p="5">
						<Stack direction="row" spacing={1} align="left">
							{workspace.services.map((service) => (
								<Badge borderRadius="full" px="2" colorScheme="teal">
									{service}
								</Badge>
							))}
						</Stack>

						<Box mt="4" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
							{workspace.name}
						</Box>

						<Box display="flex" alignItems="baseline" mt={2}>
							<Box
								color="gray.500"
								fontWeight="semibold"
								letterSpacing="wide"
								fontSize="xs"
								textTransform="uppercase"
							>
								{workspace.city}, {workspace.country}
							</Box>
						</Box>
					</Box>
				</Box>
			))}
		</SimpleGrid>
	);
}

export async function getStaticProps() {
	const res = await fetch(`http://netspaces-api:3333/api/workspaces`);
	const workspaces: Array<WorkspaceDTO> = await res.json();

	return {
		props: {
			workspaces,
		},
	};
}

export default Index;
