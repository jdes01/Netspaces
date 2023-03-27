import { SpaceAmenitiesTypes, ValueObject } from '@netspaces/domain';
import { SpaceAmenityNotValidError } from '../../exception';

export class SpaceAmenity extends ValueObject<{ value: SpaceAmenitiesTypes }> {

    public static fromString(amenity: string): SpaceAmenity {
        if (amenity in SpaceAmenitiesTypes === false) {
            throw SpaceAmenityNotValidError.withAmenity(amenity);
        }

        return new SpaceAmenity({ value: SpaceAmenitiesTypes[amenity] });
    }


    get value(): SpaceAmenitiesTypes {
        return this.props.value;
    }
}
