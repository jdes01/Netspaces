import { BookingSpaceId, BookingWorkspaceId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class BookingSpaceDoesNotBelongsToWorkspaceError extends BookingError {
    public static withIds(workspaceId: BookingWorkspaceId, spaceId: BookingSpaceId): BookingSpaceDoesNotBelongsToWorkspaceError {
        return new BookingSpaceDoesNotBelongsToWorkspaceError(`Space ${spaceId.value} does not belongs to workspace ${workspaceId.value}`);
    }
}
