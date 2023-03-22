import { Injectable, Logger } from "@nestjs/common";
import { CommandBus, ICommand, QueryBus } from "@nestjs/cqrs";
import { Result } from "ts-results";
import { CreateWorkspaceCommand } from "../../application/command/create-workspace.command";
import { GetWorkspacesQuery } from "../../application/query";
import { WorkspaceError } from "../../domain/exception";

@Injectable()
export class WorkspaceService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createWorkspace(id: string, name: string, description: string, street: string, city: string, country: string): Promise<Result<null, WorkspaceError>> {
        return this.commandBus.execute<ICommand, Result<null, WorkspaceError>>(new CreateWorkspaceCommand(id, name, description, street, city, country));
    }

    async getWorkspaces() {
        return this.queryBus.execute(new GetWorkspacesQuery())
    }

}
