/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Injectable,
  type INestApplication,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client/';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<any> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
