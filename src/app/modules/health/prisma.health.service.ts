import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class PrismaOrmHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async pingCheck(databaseName: string): Promise<any> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus(databaseName, true);
    } catch (error: any) {
      throw new ServiceUnavailableException(
        'Get in touch with the in infrastructure',
        error,
      );
    }
  }
}
