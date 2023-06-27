import { WorkspaceDTO } from '@netspaces/contracts';
import { WorkspaceGrid } from '../components/WorkspacesGrid';

export default {
  title: 'Components/WorkspaceGrid',
  component: WorkspaceGrid,
};

const workspaceDTO: WorkspaceDTO = {
  _id: 'f2039d5f-e1cb-4a26-8238-290b955651c5',
  companyId: '08887593-43b5-4d70-be69-96fcdf42127c',
  name: 'workspace name',
  description: 'description',
  street: 'calle',
  city: 'ciudad',
  country: 'pais',
  services: ['WIFI', 'WIFI'],
};

const workspaceDTOWithCoffee: WorkspaceDTO = {
  _id: 'f2039d5f-e1cb-4a26-8238-290b955651c5',
  companyId: '08887593-43b5-4d70-be69-96fcdf42127c',
  name: 'workspace name',
  description: 'description',
  street: 'calle',
  city: 'ciudad',
  country: 'pais',
  services: ['WIFI', 'WIFI', 'WIFI', 'WIFI', 'COFFEE'],
};

export const WorkspaceCardComponent = () => (
  <WorkspaceGrid
    workspaces={[
      workspaceDTO,
      workspaceDTOWithCoffee,
      workspaceDTO,
      workspaceDTO,
      workspaceDTOWithCoffee,
      workspaceDTO,
      workspaceDTOWithCoffee,
      workspaceDTO,
      workspaceDTO,
      workspaceDTO,
    ]}
  />
);
