import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './user.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser() {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() request: UserCreateDto) {
    return this.userService.createUser(request);
  }
}
