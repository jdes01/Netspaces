import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@EventPattern('create_workspace')
	getData(@Payload(ValidationPipe) data) {
		this.appService.ole();
	}

}