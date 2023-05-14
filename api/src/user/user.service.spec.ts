import { Test, TestingModule } from '@nestjs/testing';
// import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserInputSignUp } from './dto/user.input.signUp';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_TEST_URL,
      },
    },
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // Add your test cases here
  it('should sign up a new user and return a JWT token', async () => {
    const signUpInput: UserInputSignUp = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'testpassword',
    };
  
    const token = await userService.signUp(signUpInput);
    expect(token).toBeTruthy();
  });
});
