import { SpaceAmenitiesTypes, ValueObject } from '@netspaces/domain';
import { Err, Ok, Result } from 'neverthrow';

import { SpaceAmenityNotValidError } from '../../exception';

export class SpaceAmenity extends ValueObject<{ value: SpaceAmenitiesTypes }> {
	public static fromString(amenity: string): Result<SpaceAmenity, SpaceAmenityNotValidError> {
		if (amenity in SpaceAmenitiesTypes === false) {
			return new Err(SpaceAmenityNotValidError.withAmenity(amenity));
		}

		return new Ok(
			new SpaceAmenity({
				value: SpaceAmenitiesTypes[amenity],
			}),
		);
	}

	public static fromStringList(amenities: Array<string>): Result<Array<SpaceAmenity>, SpaceAmenityNotValidError> {
		try {
			return new Ok(
				amenities.map(
					(amenity) =>
						new SpaceAmenity({
							value: SpaceAmenitiesTypes[amenity],
						}),
				),
			);
		} catch (e: any) {
			return new Err(new SpaceAmenityNotValidError(e.message));
		}
	}

	public static toStringList(amenities: Array<SpaceAmenity | SpaceAmenitiesTypes>): Array<string> {
		return amenities.map((amenity) => amenity.toString());
	}

	get value(): SpaceAmenitiesTypes {
		return this.props.value;
	}
}
