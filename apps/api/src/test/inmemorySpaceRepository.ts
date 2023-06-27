import { Space } from '../space/domain/model';
import { SpaceId } from '../space/domain/model/value-objects';
import { SpaceRepository } from '../space/domain/service/repository.service';

export class InMemorySpaceRepository
  implements SpaceRepository<Space, SpaceId>
{
  public spaces: Array<Space> = [];

  constructor(spaces: Array<Space>) {
    this.spaces = spaces;
  }

  async find(id: SpaceId): Promise<Space | null> {
    const space = this.spaces.find((space) => space.id.equals(id));
    return space ? Promise.resolve(space) : Promise.resolve(null);
  }

  save(entity: Space): void {
    const index = this.spaces.findIndex((space) => space.id.equals(entity.id));
    if (index !== -1) {
      this.spaces[index] = entity;
    } else {
      this.spaces.push(entity);
    }
  }

  async delete(entity: Space): Promise<void> {
    const index = this.spaces.findIndex((space) => space.id.equals(entity.id));
    if (index !== -1) {
      this.spaces.splice(index, 1);
    }
  }
}
