import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UnauthorizedException } from '@nestjs/common';


import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Test } from '@nestjs/testing';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).compile();
    controller = app.get<UserController>(UserController);
    userService = app.get(UserService);
    jwtService = app.get(JwtService);
  });

  it('should be able to find all users', async () => {
    const users = await controller.findAll();
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should be able to find a user by ID', async () => {
    const user = await controller.findOne('1');
    expect(user).toBeDefined();
  });

  it('should be able to create a new user', async () => {
    const data = new CreateUserDto();
    data.email = 'test@example.com';
    data.password = 'password';
    const user = await controller.create(data);
    expect(user).toBeDefined();
    expect(user.email).toEqual(data.email);
  });

  it('should be able to update a user', async () => {
    const user = await controller.findOne('1');
    const data = new UpdateUserDto();
    data.name = 'New Name';
    await controller.update('1', data);
    const updatedUser = await controller.findOne('1');
    expect(updatedUser.name).toEqual(data.name);
  });

  it('should be able to remove a user', async () => {
    const user = await controller.findOne('1');
    await controller.remove('1');
    try {
      await controller.findOne('1');
      fail('User should have been removed');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should be able to login a user', async () => {
    const data = {
      email: 'test@example.com',
      password: 'password',
    };
    const token = await controller.login(data);
    expect(token).toBeDefined();
  });
});
