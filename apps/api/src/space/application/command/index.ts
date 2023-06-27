import { CreateSpaceCommand } from './create-space.command';
import { DeleteSpaceCommand } from './delete-space.command';
import { CreateSpaceHandler } from './handler/create-space.handler';
import { DeleteSpaceHandler } from './handler/delete-space.handler';
import { UpdateSpaceHandler } from './handler/update-space.handler';
import { UpdateSpaceCommand } from './update-space.command';

export const Command = [
  CreateSpaceCommand,
  UpdateSpaceCommand,
  DeleteSpaceCommand,
];
export const CommandHandlers = [
  CreateSpaceHandler,
  UpdateSpaceHandler,
  DeleteSpaceHandler,
];
