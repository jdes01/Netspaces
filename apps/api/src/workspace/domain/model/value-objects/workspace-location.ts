import { ValueObject } from '@netspaces/domain';

export type Street = { name: string }
export type City = { name: string }
export type Country = { name: string }

export type LocationCreationParams = { street: Street, city: City, country: Country }

export class WorkspaceLocation extends ValueObject<{ street: Street, city: City, country: Country }> {

    private _street: Street
    private _city: City
    private _country: Country

    public static create(params: LocationCreationParams): WorkspaceLocation {
        return new WorkspaceLocation({ street: params.street, city: params.city, country: params.country });
    }

    get street() {
        return this.props.street;
    }

    get city() {
        return this.props.city;
    }

    get country() {
        return this.props.country;
    }
}
