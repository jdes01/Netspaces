import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	handleBookingCreated(data: any) {
		console.log(data)
	}
}
