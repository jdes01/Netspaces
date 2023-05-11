import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {

	constructor(
		@Inject('BOOKING_SERVICE') private readonly bookingClient: ClientKafka
	) { }

	createBooking() {
		console.log('booking was requested!')
		this.bookingClient.emit('booking_created', 'booking was created!')
	}
}
