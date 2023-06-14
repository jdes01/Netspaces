import { WorkspaceDTO } from "@netspaces/contracts";
import { WorkspaceCard } from "../components/workspacesPage/workspaceCard";

export default {
  title: "Components/WorkspaceCard",
  component: WorkspaceCard,
};

const workspaceDTO: WorkspaceDTO = { 
    _id: "f2039d5f-e1cb-4a26-8238-290b955651c5",
    companyId: "08887593-43b5-4d70-be69-96fcdf42127c",
    name: "workspace name",
    description: "description",
    street: "calle",
    city: "ciudad",
    country: "pais",
    services: []
}

export const WorkspaceCardComponent = () => <WorkspaceCard workspace={workspaceDTO} />