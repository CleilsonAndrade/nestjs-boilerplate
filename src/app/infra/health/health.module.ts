import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaOrmHealthIndicator } from './prisma.health.service';
import { TokenHealthIndicator } from './token.health.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [PrismaOrmHealthIndicator, TokenHealthIndicator],
})
export class HealthModule {}
