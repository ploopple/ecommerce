// import { Test } from '@nestjs/testing';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';
// import { UserEntity } from './user.entity';
// import { PrismaClient } from '@prisma/client';

// describe('UserResolver', () => {
//   let userResolver: UserResolver;
//   let userService: UserService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       providers: [UserResolver, UserService,PrismaClient],
//     }).compile();

//     userResolver = moduleRef.get<UserResolver>(UserResolver);
//     userService = moduleRef.get<UserService>(UserService);
//   });

//   // ...tests go here...
//   it('should get all users', async () => {
//     const users: UserEntity[] = [
//     ];
//     jest.spyOn(userService, 'getAllUsers').mockImplementation(() => Promise.resolve(users));

//     const result = await userResolver.GetAllUsers();
//     expect(result).toEqual(users);
//   });

// });
