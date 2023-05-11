import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@EventPattern('workspace_created')
	handleBookingCreated(data: any) {
		this.appService.handleBookingCreated(data)
	}

}
