/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BadRequestException, Injectable } from '@nestjs/common';
// import { PrismaService } from '../../db/prisma/prisma.service';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(_createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    try {
      if (Number.isNaN(id)) {
        throw new Error('Please provide a valid Id');
      }

      return `This action returns a #${id} user`;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    try {
      if (Number.isNaN(id)) {
        throw new Error('Please provide a valid Id');
      }

      return `This action updates a #${id} user`;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    if (Number.isNaN(id)) {
      throw new BadRequestException('Please provide a valid Id');
    }

    return `This action removes a #${id} user`;
  }
}
