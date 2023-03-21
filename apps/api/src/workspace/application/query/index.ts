import { GetWorkspacesQuery } from './get-workspaces.query'
import { GetWorkspacesHandler } from './handler/get-workspaces.handler'

export * from './get-workspaces.query'
export * from './handler/get-workspaces.handler'

export const QueryHandlers = [
    GetWorkspacesHandler,
]

export const Queries = [
    GetWorkspacesQuery,
]