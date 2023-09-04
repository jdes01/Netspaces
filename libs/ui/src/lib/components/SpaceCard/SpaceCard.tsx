import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import { SpaceDTO } from '../../../../../contracts';
import React from 'react';

type Props = {
  space: SpaceDTO;
  onClick: (space: SpaceDTO) => void;
  highlighted: boolean;
};

export function SpaceCard({ space, onClick, highlighted = false }: Props) {
  return (
    <Box
      m={1}
      borderRadius={20}
      borderWidth={2}
      borderColor={highlighted === true ? 'red' : 'transparent'}
      _hover={{ cursor: 'pointer', shadow: 'base' }}
      onClick={() => {
        onClick(space);
      }}
    >
      <Image
        width={'300px'}
        height={'200px'}
        borderRadius={20}
        src={space.image}
        loading="lazy"
      />

      <Box p="5">
        <Stack direction="row" spacing={1} align="left">
          {space.amenitys.map((amenity) => (
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal"
              position={'relative'}
              left={1}
              right={1}
            >
              {amenity}
            </Badge>
          ))}
        </Stack>

        <Box
          mt="4"
          fontWeight="bold"
          as="h4"
          lineHeight="tight"
          width={'250px'}
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {space.name}
        </Box>

        <Box display="flex" alignItems="baseline" mt={2}>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
          >
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal"
              position={'relative'}
              mr={3}
              left={1}
            >
              {space.seats} seats
            </Badge>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
