import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';
import UserEntity from './user.entity';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@User() user: UserEntity): UserEntity {
        return user;
    }
}