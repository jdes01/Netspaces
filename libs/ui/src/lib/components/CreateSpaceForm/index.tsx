import {
  ModalHeader,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  ModalOverlay,
  Stack,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react';

import React from 'react';
import { BsBuildingFillAdd } from 'react-icons/bs';

import { SpaceAmenitysTypes } from '@netspaces/domain';

type CreateSpaceFormProps = {
  handleSubmit: () => void;
  setFormName: React.Dispatch<React.SetStateAction<string>>;
  setFormQuantity: React.Dispatch<React.SetStateAction<number>>;
  setFormSeats: React.Dispatch<React.SetStateAction<number>>;
  setFormAmenitys: React.Dispatch<React.SetStateAction<Array<string>>>;
  setFormImage: React.Dispatch<React.SetStateAction<string>>;
  formAmenitys: Array<string>;
};

export function CreateSpaceForm({
  handleSubmit,
  setFormName,
  setFormQuantity,
  setFormSeats,
  setFormAmenitys,
  setFormImage,
  formAmenitys,
}: CreateSpaceFormProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleAmenityToggle = (amenity: string): void => {
    if (formAmenitys.includes(amenity)) {
      setFormAmenitys(formAmenitys.filter((a) => a !== amenity));
    } else {
      setFormAmenitys([...formAmenitys, amenity]);
    }
  };

  return (
    <>
      <HStack position="fixed" bottom={10} left={10}>
        <IconButton
          aria-label="toggle theme"
          rounded="full"
          size="lg"
          onClick={() => onOpen()}
          icon={<BsBuildingFillAdd />}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={6}>
          <ModalHeader>Create Space</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input onChange={(e) => setFormName(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                onChange={(e) => setFormQuantity(Number(e.target.value))}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Seats</FormLabel>
              <Input onChange={(e) => setFormSeats(Number(e.target.value))} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Images</FormLabel>
              <Input
                placeholder="url:"
                onChange={(e) => setFormImage(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Amenities:</FormLabel>
              <VStack spacing={5} direction="row" align={'left'}>
                {Object.keys(SpaceAmenitysTypes).map((key) => {
                  return (
                    <Checkbox
                      key={key}
                      isChecked={formAmenitys.includes(key)}
                      onChange={() => handleAmenityToggle(key)}
                    >
                      {key}
                    </Checkbox>
                  );
                })}
              </VStack>
            </FormControl>
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
              Create Space
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
