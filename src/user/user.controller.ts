import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() data: User): Promise<User> {
    return this.userService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: User): Promise<User> {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(+id);
  }
}
