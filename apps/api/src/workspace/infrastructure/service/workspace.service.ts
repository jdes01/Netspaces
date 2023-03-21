import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateWorkspaceCommand } from "../../application/command/create-workspace.command";
import { GetWorkspacesQuery } from "../../application/query";

@Injectable()
export class WorkspaceService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createWorkspace(id: string, name: string, description: string, street: string, city: string, country: string) {
        return this.commandBus.execute(new CreateWorkspaceCommand(id, name, description, street, city, country));
    }

    async getWorkspaces() {
        return this.queryBus.execute(new GetWorkspacesQuery())
    }

}
