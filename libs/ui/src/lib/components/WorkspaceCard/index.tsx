import { Badge, Box, Image, Stack, Text } from '@chakra-ui/react';
import { WorkspaceDTO } from '../../../../../contracts';
import { useRouter } from 'next/router';
import React from 'react';

type WorkspaceCardProps = {
  workspace: WorkspaceDTO;
  onWorkspaceCardClickRoute: string;
};

export function WorkspaceCard({
  workspace,
  onWorkspaceCardClickRoute,
}: WorkspaceCardProps) {
  const router = useRouter();

  return (
    <Box
      borderRadius={20}
      borderWidth={0}
      padding={1}
      width={'270px'}
      height={'fit-content'}
      display={'grid'}
      gap={5}
      _hover={{ shadow: 'lg' }}
      onClick={() =>
        router.push(`${onWorkspaceCardClickRoute}${workspace._id}`)
      }
      overflow="hidden"
    >
      <Image
        borderRadius={20}
        width={'300px'}
        height={'200px'}
        src={workspace?.images[0]}
        loading="lazy"
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
          <Box
            paddingRight={4}
            fontWeight="bold"
            as="h4"
            lineHeight="tight"
            width={'250px'}
            noOfLines={2}
            textOverflow="ellipsis"
          >
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
