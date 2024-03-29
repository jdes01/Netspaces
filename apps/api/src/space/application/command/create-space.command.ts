import { ICommand } from '@nestjs/cqrs';

export class CreateSpaceCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly workspaceId: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly seats: number,
    public readonly amenitys: Array<string>,
    public readonly image: string,
  ) { }
}
