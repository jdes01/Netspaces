import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';

type WorkspaceCardProps = {
	workspace: WorkspaceDTO;
};

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
	const router = useRouter();
	return (
		<Box
			m={1}
			onClick={() => router.push(`/admin/workspaces/${workspace._id}`)}
			borderRadius={20}
			borderColor={'transparent'}
			_hover={{ cursor: 'pointer', shadow: 'base' }}
		>
			<Image borderRadius={20} src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg" />
			<Box p="5">
				<Stack direction="row" spacing={1} align="left">
					{workspace.services.map((service) => (
						<Badge borderRadius="full" px="2" colorScheme="teal" position={'relative'} left={1} right={1}>
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
	);
}
