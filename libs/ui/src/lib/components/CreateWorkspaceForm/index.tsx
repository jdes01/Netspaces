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
  Grid,
} from '@chakra-ui/react';

import React from 'react';
import { BsBuildingFillAdd } from 'react-icons/bs';

import { WorkspaceServicesTypes } from '@netspaces/domain';

type CreateWorkspaceFormProps = {
  handleSubmit: () => void;
  setFormName: React.Dispatch<React.SetStateAction<string>>;
  setFormDescription: React.Dispatch<React.SetStateAction<string>>;
  setFormStreet: React.Dispatch<React.SetStateAction<string>>;
  setFormCity: React.Dispatch<React.SetStateAction<string>>;
  setFormCountry: React.Dispatch<React.SetStateAction<string>>;
  setFormImageOne: React.Dispatch<React.SetStateAction<string>>;
  setFormImageTwo: React.Dispatch<React.SetStateAction<string>>;
  setFormImageThree: React.Dispatch<React.SetStateAction<string>>;
  setFormServices: React.Dispatch<React.SetStateAction<Array<string>>>;
  formServices: Array<string>;
};

export function CreateWorkspaceForm({
  handleSubmit,
  setFormName,
  setFormDescription,
  setFormStreet,
  setFormCity,
  setFormCountry,
  setFormImageOne,
  setFormImageTwo,
  setFormImageThree,
  setFormServices,
  formServices,
}: CreateWorkspaceFormProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleServiceToggle = (service: string): void => {
    if (formServices.includes(service)) {
      setFormServices(formServices.filter((s) => s !== service));
    } else {
      setFormServices([...formServices, service]);
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
          <ModalHeader>Create Workspace</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input onChange={(e) => setFormName(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Input onChange={(e) => setFormDescription(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Street</FormLabel>
              <Input onChange={(e) => setFormStreet(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>City</FormLabel>
              <Input onChange={(e) => setFormCity(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Country</FormLabel>
              <Input onChange={(e) => setFormCountry(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Images</FormLabel>
              <Input
                mt={1}
                placeholder="url:"
                onChange={(e) => setFormImageOne(e.target.value)}
              />
              <Input
                mt={1}
                placeholder="url:"
                onChange={(e) => setFormImageTwo(e.target.value)}
              />
              <Input
                mt={1}
                placeholder="url:"
                onChange={(e) => setFormImageThree(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel></FormLabel>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {Object.keys(WorkspaceServicesTypes).map((key) => (
                  <Checkbox
                    key={key}
                    isChecked={formServices.includes(key)}
                    onChange={() => handleServiceToggle(key)}
                    borderColor={'gray.400'}
                  >
                    {key}
                  </Checkbox>
                ))}
              </Grid>
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
              Create Workspace
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
