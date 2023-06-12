import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    return this.userService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    const user = await this.userService.update(+id, data);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    const user = await this.userService.remove(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('login')
  async login(@Body() data: { email: string, password: string }): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });
    return { token };
  }
}
