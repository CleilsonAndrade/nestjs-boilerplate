import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class PrismaOrmHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaServiceEX: PrismaService) {
    super();
  }

  async pingCheck(databaseName: string): Promise<any> {
    try {
      await this.prismaServiceEX.$queryRaw`SELECT 1`;
      return this.getStatus(databaseName, true);
    } catch (error: any) {
      throw new ServiceUnavailableException(
        'Contact the technical support team',
        error,
      );
    }
  }
}
