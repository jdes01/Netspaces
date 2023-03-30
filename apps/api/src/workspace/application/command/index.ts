import { CreateWorkspaceCommand } from './create-workspace.command';
import { CreateWorkspaceHandler } from './handler/create-workspace.handler';

export const CommandHandlers = [CreateWorkspaceHandler];

export const Command = [CreateWorkspaceCommand];
