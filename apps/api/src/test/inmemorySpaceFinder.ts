import { SpaceDTO } from "@netspaces/contracts";
import { SpaceFinder } from "../space/application/service/space-finder.service";
import { SpaceId } from "../space/domain/model/value-objects";
import { WorkspaceId } from "../workspace/domain/model/value-objects";

export class InMemorySpaceFinder implements SpaceFinder {
    private spaces: SpaceDTO[] = []

    constructor(spaces: Array<SpaceDTO>) {
        this.spaces = spaces
    }

    async find(id: SpaceId): Promise<SpaceDTO | null> {
        const space = this.spaces.find(space => space._id === id.value);
        return space || null;
    }

    async findAll(): Promise<SpaceDTO[]> {
        return this.spaces;
    }

    async findByWorkspaceId(id: WorkspaceId): Promise<Array<SpaceDTO>> {
        return this.spaces.filter(space => space.workspaceId === id.value);
    }

}