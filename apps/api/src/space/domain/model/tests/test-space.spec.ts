import { CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { SpaceId, SpaceName, SpaceAmenity } from '../value-objects';
import { Space } from '../space'
import { SpaceWasCreated } from '../../event/space-was-created';

describe('Space entity', () => {

    let eventBus$: EventBus;
    let eventPublisher$: EventPublisher;

    let space: Space;

    const id = SpaceId.fromString('79cb910f-e2de-4c16-83f4-0d65c6bed2fc')
    const name = SpaceName.fromString('space name')
    const quantity = 1
    const seats = 1

    const standintDesk = SpaceAmenity.STANDING_DESK

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CqrsModule],
        }).compile();

        eventPublisher$ = module.get<EventPublisher>(EventPublisher);
        eventBus$ = module.get<EventBus>(EventBus);
        eventBus$.publish = jest.fn();
    });

    it('should create an instance successfully', async () => {

        space = eventPublisher$.mergeObjectContext(
            Space.add(id, name, quantity, seats)
        );
        space.commit();

        // expect(eventBus$.publish).toHaveBeenCalledTimes(1);
        // expect(eventBus$.publish).toHaveBeenCalledWith(
        //     new SpaceWasCreated(
        //         id.value,
        //         name.value,
        //         quantity,
        //         seats,
        //     ),
        // );
    });


    it('should have a name', async () => {
        expect(space.name).toEqual(name);
    });

    it('should not be deleted', async () => {
        expect(space.deleted).toBe(null)
    });

    it('should be able to add amenities', async () => {
        space.add_amenity(standintDesk)
        expect(space)
        expect(space.amenities.length).toBe(1)
        expect(space.amenities[0]).toBe(SpaceAmenity.STANDING_DESK)
    });

});