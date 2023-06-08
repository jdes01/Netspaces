import { CreateWorkspaceCommand } from './create-workspace.command';
import { CreateWorkspaceHandler } from './handler/create-workspace.handler';
import { UpdateWorkspaceHandler } from './handler/update-workspace.handler';
import { UpdateWorkspaceCommand } from './update-workspace.command';

export const CommandHandlers = [CreateWorkspaceHandler, UpdateWorkspaceHandler];

export const Command = [CreateWorkspaceCommand, UpdateWorkspaceCommand];
