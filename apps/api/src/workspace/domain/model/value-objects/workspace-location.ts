import { ValueObject } from '@netspaces/domain';
import { WorkspaceCreationParams } from '../../event';

export type Street = { name: string }
export type City = { name: string }
export type Country = { name: string }

export class WorkspaceLocation {

    private _street: string
    private _city: string
    private _country: string

    public constructor(street: string, city: string, country: string) {
        this._street = street
        this._city = city
        this._country = country
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
