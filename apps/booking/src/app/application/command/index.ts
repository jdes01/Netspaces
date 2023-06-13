import { CreateBookingCommand } from './create-booking.command';
import { DeleteBookingCommand } from './delete-booking.command';
import { CreateBookingHandler } from './handler/create-booking.handler';
import { DeleteBookingHandler } from './handler/delete-booking.handler';

export const CommandHandlers = [CreateBookingHandler, DeleteBookingHandler];

export const Command = [CreateBookingCommand, DeleteBookingCommand];
