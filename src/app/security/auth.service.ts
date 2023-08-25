import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaServiceEX: PrismaService) {}

  async validateUser(userId: number): Promise<any> {
    try {
      const user = await this.prismaServiceEX.u_user.findUnique({
        where: {
          id: userId,
        },
        select: {
          username: true,
        },
      });

      if (!user) {
        throw new Error('Not validated user');
      }

      return user;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
