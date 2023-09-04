import { SpaceAmenitysTypes, ValueObject } from '@netspaces/domain';
import { Err, Ok, Result } from 'neverthrow';

import { SpaceAmenityNotValidError } from '../../exception';

export class SpaceAmenity extends ValueObject<{ value: SpaceAmenitysTypes }> {
  public static fromString(
    amenity: string,
  ): Result<SpaceAmenity, SpaceAmenityNotValidError> {
    if (amenity in SpaceAmenitysTypes === false) {
      return new Err(SpaceAmenityNotValidError.withAmenity(amenity));
    }

    return new Ok(
      new SpaceAmenity({
        value: SpaceAmenitysTypes[amenity],
      }),
    );
  }

  public static fromStringList(
    amenitys: Array<string>,
  ): Result<Array<SpaceAmenity>, SpaceAmenityNotValidError> {
    try {
      const spaceAmenitys = amenitys.map((amenity) => {
        const amenityType = SpaceAmenitysTypes[amenity];
        if (amenityType === undefined) {
          throw new Error(amenity);
        }
        return new SpaceAmenity({ value: amenityType });
      });

      return new Ok(spaceAmenitys);
    } catch (e: any) {
      return new Err(new SpaceAmenityNotValidError(e.message));
    }
  }

  public static toStringList(
    amenitys: Array<SpaceAmenity | SpaceAmenitysTypes>,
  ): Array<string> {
    return amenitys.map((amenity) => amenity.toString());
  }

  get value(): SpaceAmenitysTypes {
    return this.props.value;
  }
}
