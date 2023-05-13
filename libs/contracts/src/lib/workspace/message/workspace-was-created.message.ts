// @ts-nocheck

export const WORKSPACE_WAS_CREATED_MESSAGE = 'WORKSPACE_WAS_CREATED_MESSAGE'

export type WorkspaceWasCreatedMessage = {

    readonly _id: string;
    readonly owner: string;
    readonly name: string;
    readonly description: string;
    readonly street: string;
    readonly city: string;
    readonly country: string;
    readonly services: Array<string>;

}

export class WorkspaceWasCreatedMessageBuilder {
    static build(
        _id: string,
        owner: string,
        name: string,
        description: string,
        street: string,
        city: string,
        country: string,
        services: Array<string>,
    ) {
        return {
            _id,
            owner,
            name,
            description,
            street,
            city,
            country,
            services,
        }
    }
}
