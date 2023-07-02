import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  type HealthCheckResult,
} from '@nestjs/terminus';
import { PrismaOrmHealthIndicator } from './prisma.health.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly db: PrismaOrmHealthIndicator,
  ) {}

  /**
   * The function checks the health of various components including the database, memory, and storage.
   * @returns The check() function is returning the result of calling the health.check() method
   * with an array of functions as arguments. Each function in the array is a check for a different
   * aspect of the system's health, including the status of the database, memory usage, and disk
   * storage. The health.check() method will return a Promise that resolves with an array of objects
   * representing the results of each check
   */

  @ApiOperation({
    summary:
      'The function checks the health of various components including the database, memory, and storage.',
  })
  @ApiResponse({ status: 201, description: 'OK' })
  @Get()
  async check(): Promise<HealthCheckResult> {
    return await this.health.check([
      async () => await this.db.pingCheck('name_db'),
      async () => await this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => await this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      async () =>
        await this.disk.checkStorage('storage', {
          thresholdPercent: 0.8,
          path: '/',
        }),
    ]);
  }
}
