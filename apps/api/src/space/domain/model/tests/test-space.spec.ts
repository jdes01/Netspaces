import { SpaceId, SpaceName, SpaceAmenity } from '../value-objects';
import { Space } from '../space'

describe('Space entity', () => {

    it('should create an instance successfully', async () => {

        const id = SpaceId.fromString('79cb910f-e2de-4c16-83f4-0d65c6bed2fc')
        const name = SpaceName.fromString('space name')
        const quantity = 1
        const seats = 1

        const space = Space.add(id, name, quantity, seats);

        expect(space.name).toEqual(name)
        expect(space.deleted).toBe(null)
    });

    it('should be able to add multile amenities', async () => {

        const id = SpaceId.fromString('79cb910f-e2de-4c16-83f4-0d65c6bed2fc')
        const name = SpaceName.fromString('space name')
        const quantity = 1
        const seats = 1

        const space = Space.add(id, name, quantity, seats);

        const standintDesk = SpaceAmenity.STANDING_DESK

        space.add_amenity(standintDesk)

        expect(space)
        expect(space.amenities.length).toBe(1)
        expect(space.amenities[0]).toBe(SpaceAmenity.STANDING_DESK)
    });

});