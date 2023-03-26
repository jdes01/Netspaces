import { GetSpacesQuery } from "./get-spaces.query"
import { GetSpacesHandler } from "./handler/get-spaces.handler"
export * from './get-spaces.query'

export const QueryHandlers = [
    GetSpacesHandler
]


export const Query = [
    GetSpacesQuery,
]