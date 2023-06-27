import { CreateWorkspaceCommand } from './create-workspace.command';
import { DeleteWorkspaceCommand } from './delete-workspace.command';
import { CreateWorkspaceHandler } from './handler/create-workspace.handler';
import { DeleteWorkspaceHandler } from './handler/delete-workspace.handler';
import { UpdateWorkspaceHandler } from './handler/update-workspace.handler';
import { UpdateWorkspaceCommand } from './update-workspace.command';

export const CommandHandlers = [
  CreateWorkspaceHandler,
  UpdateWorkspaceHandler,
  DeleteWorkspaceHandler,
];

export const Command = [
  CreateWorkspaceCommand,
  UpdateWorkspaceCommand,
  DeleteWorkspaceCommand,
];
