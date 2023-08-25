import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from 'src/app/database/prisma/prisma.service';
import { HealthController } from './health.controller';
import { PrismaOrmHealthIndicator } from './prisma.health.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [PrismaOrmHealthIndicator, PrismaService],
})
export class HealthModule {}
