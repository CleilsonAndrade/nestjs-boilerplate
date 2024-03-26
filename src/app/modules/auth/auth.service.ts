import { PrismaService } from '@infra/database/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });

      if (!user || user.password !== password) {
        throw new Error('Invalid username or password');
      }

      return user;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async generateJwtToken(user: any): Promise<string> {
    const payload = {
      sub: user.id,
      username: user.username,
      password: user.password,
    };

    return this.jwtService.sign(payload);
  }
}
