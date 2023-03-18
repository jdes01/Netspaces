import { WorkspaceReadModel } from '../../domain/read-model/workspace.read-model';
import { WorkspaceDocument } from '../projection';

export class WorkspaceDocumentReadModelMapper {
    static documentsToReadModel(documents: Array<WorkspaceDocument>): Array<WorkspaceReadModel> {
        return documents.map((document) => ({
            id: document._id,
            name: document.name,
            description: document.description,
        }));
    }

}