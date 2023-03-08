import { ValueObject } from '@netspaces/domain';
import { WorkspaceCreationParams } from '../../event';

export type Street = { name: string }
export type City = { name: string }
export type Country = { name: string }

export type LocationDTO = {
    street: Street,
    city: City,
    country: Country
}

export class WorkspaceLocation {

    private _street: Street
    private _city: City
    private _country: Country

    private constructor(creationParams: LocationDTO) {
        this._street = creationParams.street
        this._city = creationParams.city
        this._country = creationParams.country
    }

    public static create(creationParams: LocationDTO): WorkspaceLocation {
        return new WorkspaceLocation(creationParams);
    }

    get street() {
        return this._street;
    }

    get city() {
        return this._city;
    }

    get country() {
        return this._country;
    }
}
