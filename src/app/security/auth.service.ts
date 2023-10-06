import { PrismaService } from '@infra/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(userId: number): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          user_name: true,
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
