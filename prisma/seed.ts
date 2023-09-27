import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../src/app/modules/user/dto/create-user.dto';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    const createUserDto: CreateUserDto = {
      user_name: 'johnD@e10',
      password: '12@#!10Aa',
      user_is_active: 1,
    };

    const newUser = await prisma.user.create({
      data: {
        user_name: createUserDto.user_name,
        password: createUserDto.password,
        user_is_active: 1,
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
