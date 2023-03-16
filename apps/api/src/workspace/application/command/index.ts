import { CreateWorkspaceHandler } from './handler/create-workspace.handler'
import { CreateWorkspaceCommand } from './create-workspace.command'

export const CommandHandlers = [
    CreateWorkspaceHandler,
]

export const Command = [
    CreateWorkspaceCommand,
]