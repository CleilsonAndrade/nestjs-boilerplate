import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(userId: number): Promise<number> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: userId },
        select: { id: true },
      });

      if (!user) {
        throw new Error('Not validated user');
      }

      return user.id;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
