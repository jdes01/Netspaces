import { Inject } from "@nestjs/common";
import { MONGODB_CONNECTION } from "apps/api/src/mongodb/mongodb.provider";
import { Connection, Model } from "mongoose";
import { WorkspaceProjection } from "../../domain/projection";
import { WorkspaceReadModel } from "../../domain/read-model/workspace.read-model";
import { WorkspaceDocumentReadModelMapper } from "../mapper";
import { WorkspaceDocument, WorkspaceSchema } from "./workspace.schema";

export class WorkspaceMongoDBProjection implements WorkspaceProjection {
    private model: Model<WorkspaceDocument>;

    constructor(@Inject(MONGODB_CONNECTION) connection: Connection) {
        this.model = connection.model<WorkspaceDocument>('workspaces', WorkspaceSchema);
    }

    async save(workspace: WorkspaceReadModel): Promise<void> {
        await this.model.create({
            _id: workspace.id,
            ...workspace,
        });
    }

    async getAll(): Promise<Array<WorkspaceReadModel>> {
        const workspacesDocuments = await this.model.find()
        return WorkspaceDocumentReadModelMapper.documentsToReadModel(workspacesDocuments)
    }
}