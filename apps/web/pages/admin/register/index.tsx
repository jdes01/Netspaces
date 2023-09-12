import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

const Formulario = () => {
  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh" // Esto hará que ocupe toda la altura de la pantalla
    >
      <Flex
        direction="column"
        p={8}
        rounded={8}
        shadow="md"
        bg="white"
        width={700}
        borderColor={'blackAlpha.400'}
        borderWidth={2}
      >
        <Heading as="h2" size="lg" mb={4}>
          Register as Admin!
        </Heading>
        <form>
          <FormControl id="companyName" mb={4}>
            <FormLabel>Comapny name:</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="adminName" mb={4}>
            <FormLabel>Admin name:</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="adminMail" mb={4}>
            <FormLabel>email:</FormLabel>
            <Input type="email" />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Create
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export const Index = () => {
  return (
    <div>
      <Formulario />
    </div>
  );
};

export default Index;
