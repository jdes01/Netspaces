import { GetWorkspaceByIdQuery } from './get-workspace-by-id.query'
import { GetWorkspacesQuery } from './get-workspaces.query'
import { GetWorkspaceByIdHandler } from './handler/get-workspace-by-id.handler'
import { GetWorkspacesHandler } from './handler/get-workspaces.handler'

export * from './get-workspaces.query'
export * from './handler/get-workspaces.handler'

export const QueryHandlers = [
    GetWorkspacesHandler,
    GetWorkspaceByIdHandler
]

export const Queries = [
    GetWorkspacesQuery,
    GetWorkspaceByIdQuery
]