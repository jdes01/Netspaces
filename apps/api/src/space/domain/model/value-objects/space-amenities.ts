// @ts-nocheck

import { SpaceAmenitiesTypes, ValueObject } from '@netspaces/domain';

import { SpaceAmenityNotValidError } from '../../exception';
import { Err, Ok, Result } from 'ts-results';

export class SpaceAmenity extends ValueObject<{ value: SpaceAmenitiesTypes }> {
	public static fromString(amenity: string): Result<SpaceAmenity, SpaceAmenityNotValidError> {
		if (amenity in SpaceAmenitiesTypes === false) {
			return Err(SpaceAmenityNotValidError.withAmenity(amenity));
		}

		return Ok(new SpaceAmenity({
			value: SpaceAmenitiesTypes[amenity],
		}));
	}

	public static fromStringList(amenities: Array<string>): Result<Array<SpaceAmenity>, SpaceAmenityNotValidError> {
		try {
			return Ok(amenities.map((amenity) => new SpaceAmenity({
				value: SpaceAmenitiesTypes[amenity],
			})))
		} catch (e: any) {
			return Err(new SpaceAmenityNotValidError(e.message));
		}

	}

	get value(): SpaceAmenitiesTypes {
		return this.props.value;
	}
}
