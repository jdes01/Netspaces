import { SpaceError } from "./space-error";

export class SpaceAmenityNotValidError extends SpaceError {
    public static withAmenity(amenity: string): SpaceAmenityNotValidError {
        return new SpaceAmenityNotValidError(
            `space amenity ${amenity} not valid`,
        );
    }
}
