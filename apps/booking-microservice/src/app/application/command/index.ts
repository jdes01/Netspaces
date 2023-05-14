import { CreateBookingCommand } from './create-booking.command';
import { CreateBookingHandler } from './handler/create-booking.handler';

export const CommandHandlers = [CreateBookingHandler];

export const Command = [CreateBookingCommand];
