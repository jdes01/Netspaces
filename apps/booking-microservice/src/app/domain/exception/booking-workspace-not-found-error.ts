import { BookingWorkspaceId } from '../model/value-objects';
import { BookingError } from './booking-error';

export class BookingWorkspaceNotFoundError extends BookingError {
    public static withWorkspaceId(id: BookingWorkspaceId): BookingWorkspaceNotFoundError {
        return new BookingWorkspaceNotFoundError(`Workspace with id ${id.value} not found`);
    }
}
