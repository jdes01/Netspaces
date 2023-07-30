import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';
import React from 'react';

type WorkspaceCardProps = {
  workspace: WorkspaceDTO;
};

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();

  return (
    <Box
      borderRadius={20}
      borderWidth={0}
      padding={1}
      width={'100%'}
      maxWidth={500}
      height={'fit-content'}
      display={'grid'}
      gap={5}
      _hover={{ shadow: 'lg' }}
      onClick={() => router.push(`/workspaces/${workspace._id}`)}
    >
      <Image
        borderRadius={20}
        width={'100%'}
        height={'100%'}
        src="https://pbs.twimg.com/media/EnQp7n1XcAI9ZF4.jpg"
      />

      <Box marginLeft={3} marginBottom={5} display={'grid'} gap={4}>
        <Stack direction={'row'} align={'left'}>
          {workspace.services.slice(0, 3).map((service, index) => (
            <Badge
              key={index}
              borderRadius="full"
              px="2"
              colorScheme="teal"
              position="relative"
              fontSize="xs"
            >
              {service}
            </Badge>
          ))}
          {workspace.services.length > 3 && (
            <Badge
              key="more"
              borderRadius="full"
              px="2"
              colorScheme="teal"
              position="relative"
              left={1}
              right={1}
              fontSize="xs"
            >
              +
            </Badge>
          )}
        </Stack>
        <Box fontWeight={'semibold'}>
          <Box fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
            {workspace.name}
          </Box>
          <Box
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
