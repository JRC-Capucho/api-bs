import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwTGuard } from '../auth/guard';
import { UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwTGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('email') userEmail: string, @Body() dto: UserDto) {
    return this.userService.editUser(userEmail, dto);
  }
}
