import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
// import { PrismaService } from 'src/app/database/prisma/prisma.service';

@Injectable()
export class UserService {
  // constructor(private readonly prismaService: PrismaService){}

  async create(
    _createUserDto: CreateUserDto,
    user: Express.User | object,
  ): Promise<any> {
    try {
      let username: string;
      if ('username' in user) {
        username = (user as { username: string }).username;
      } else {
        throw new Error('Invalid user');
      }

      return 'This action adds a new user' + username;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(take: number, skip: number): Promise<any> {
    console.log(take, skip);
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<any> {
    try {
      if (Number.isNaN(id)) {
        throw new Error('Please provide a valid Id');
      }

      return `This action returns a #${id} user`;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    _updateUserDto: UpdateUserDto,
    user: Express.User | object,
  ): Promise<any> {
    try {
      let username: string;
      if ('username' in user) {
        username = (user as { username: string }).username;
      } else {
        throw new Error('Invalid user');
      }

      if (Number.isNaN(id)) {
        throw new Error('Please provide a valid Id');
      }

      return `This action updates a #${id} ${username}`;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number, user: Express.User | object): Promise<any> {
    try {
      let username: string;
      if ('username' in user) {
        username = (user as { username: string }).username;
      } else {
        throw new Error('Invalid user');
      }

      if (Number.isNaN(id)) {
        throw new BadRequestException('Please provide a valid Id');
      }

      return `This action removes a #${id} ${username}`;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
