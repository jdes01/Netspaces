import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import { WorkspaceDTO } from '@netspaces/contracts';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CreateWorkspaceForm, WorkspaceGrid } from '@netspaces/ui';

const GET_WORKSPACES_BY_COMPANY_ID = gql`
  query GetWorkspacesByCompanyId($companyId: String!) {
    workspacesByCompanyId(id: $companyId) {
      _id
      name
      description
      street
      city
      country
      services
      images
    }
  }
`;

const GET_USER_NAME = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      name
    }
  }
`;

const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspaceMutation(
    $_id: String!
    $companyId: String!
    $name: String!
    $description: String!
    $street: String!
    $city: String!
    $country: String!
    $services: [String!]!
    $images: [String!]!
  ) {
    createWorkspace(
      workspaceInput: {
        _id: $_id
        companyId: $companyId
        name: $name
        description: $description
        street: $street
        city: $city
        country: $country
        services: $services
        images: $images
      }
    )
  }
`;

type Props = {
  userId: string;
  companyId: string;
};

export function Index({ userId, companyId }: Props) {
  const router = useRouter();
  const [createWorkspace] = useMutation(CREATE_WORKSPACE_MUTATION);

  const emptyList: Array<string> = [];

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formServices, setFormServices] = useState(emptyList);
  const [formImageOne, setFormImageOne] = useState('');
  const [formImageTwo, setFormImageTwo] = useState('');
  const [formImageThree, setFormImageThree] = useState('');

  const { loading, workspaces } = getPageData(userId, companyId);

  if (loading) return <Heading>Loading</Heading>;

  const handleSubmit = () => {
    createWorkspace({
      variables: {
        _id: uuidv4(),
        city: formCity,
        country: formCountry,
        description: formDescription,
        name: formName,
        companyId: companyId,
        services: formServices,
        street: formStreet,
        images: [formImageOne, formImageTwo, formImageThree],
      },
    });
    router.reload();
  };

  return (
    <>
      <Box p="5" m={[0, null, 5]}>
        <WorkspaceGrid
          workspaces={workspaces}
          onWorkspaceCardClickRoute="/admin/workspaces/"
        ></WorkspaceGrid>
        <CreateWorkspaceForm
          handleSubmit={handleSubmit}
          setFormName={setFormName}
          setFormDescription={setFormDescription}
          setFormStreet={setFormStreet}
          setFormCity={setFormCity}
          setFormCountry={setFormCountry}
          setFormServices={setFormServices}
          setFormImageOne={setFormImageOne}
          setFormImageTwo={setFormImageTwo}
          setFormImageThree={setFormImageThree}
          formServices={formServices}
        />
      </Box>
    </>
  );
}

function getPageData(userId: string, companyId: string) {
  const { userName } = getUserName(userId);
  const { loading, workspaces } = getWorkspaces(companyId);

  return { loading, userName, workspaces };
}

function getWorkspaces(companyId: string) {
  const { data, loading } = useQuery(GET_WORKSPACES_BY_COMPANY_ID, {
    variables: { companyId },
  });
  const workspaces: Array<WorkspaceDTO> = data?.workspacesByCompanyId ?? [];

  return { loading, workspaces };
}

function getUserName(id: string) {
  const { data } = useQuery(GET_USER_NAME, {
    variables: { id },
  });
  const userName: string = data?.user.name;
  return { userName };
}

export async function getServerSideProps() {
  const userId: string | null = `${process.env.ADMIN_UUID}`;
  const companyId: string | null = `${process.env.ADMIN_COMPANY_UUID}`;

  return {
    props: { userId, companyId },
  };
}

export default Index;
