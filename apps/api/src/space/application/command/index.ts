import { CreateSpaceCommand } from './create-space.command';
import { CreateSpaceHandler } from './handler/create-space.handler';
import { UpdateSpaceHandler } from './handler/update-space.handler';
import { UpdateSpaceCommand } from './update-space.command';

export const Command = [CreateSpaceCommand, UpdateSpaceCommand];
export const CommandHandlers = [CreateSpaceHandler, UpdateSpaceHandler];
