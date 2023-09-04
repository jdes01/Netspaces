import { Box, FormControl, HStack, IconButton, Select } from '@chakra-ui/react';
import { City, Country, State } from 'country-state-city';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';

type LocationFinderProps = {
  onSelect: (city: string) => void;
};

export function LocationFinder({ onSelect }: LocationFinderProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };
  return (
    <Box
      m={1}
      p={1}
      borderRadius={20}
      borderColor={'transparent'}
      shadow={'base'}
    >
      <FormControl borderColor={'transparent'}>
        <HStack>
          <IconButton
            aria-label="search location"
            rounded="full"
            size="md"
            icon={<FiMapPin />}
            bg={'#FAF9F6'}
          />
          <Select
            placeholder="Select city"
            borderColor={'transparent'}
            focusBorderColor="transparent"
            onChange={handleSelectChange}
          >
            {City.getCitiesOfState('ES', 'AN')?.map((city) => {
              return <option>{city.name}</option>;
            })}
          </Select>
        </HStack>
      </FormControl>
    </Box>
  );
}
