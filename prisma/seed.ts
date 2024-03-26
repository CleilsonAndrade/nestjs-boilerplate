import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../src/app/modules/user/dto/create-user.dto';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    const createUserDto: CreateUserDto = {
      username: 'johnD@e10',
      password: '12@#!10Aa',
      userIsActive: 1,
    };

    const newUser = await prisma.user.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
        userIsActive: 1,
      },
    });

    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
