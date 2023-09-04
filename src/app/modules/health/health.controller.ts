import { BadRequestException, Controller, Get } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaOrmHealthIndicator } from './prisma.health.service';
import { TokenHealthIndicator } from './token.health.service';

@ApiTags('Default')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly db: PrismaOrmHealthIndicator,
    private readonly token: TokenHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  /**
   * The function checks the health of various components including the database, memory, and storage.
   * @returns The `check()` function is returning the result of calling the `health.check()` method
   * with an array of functions as arguments. Each function in the array is a check for a different
   * aspect of the system's health, including the status of the database, memory usage, and disk
   * storage. The `health.check()` method will return a Promise that resolves with an array of objects
   * representing the results of each check
   */

  @ApiOperation({
    summary:
      'The function checks the health of various components including the database, memory, and storage.',
    description:
      '- Health checks are crucial when it comes to complex backend setups. In a nutshell, a health check in the realm of web development usually consists of a special address, for example, https://my-website.com/health/readiness. A service or a component of your infrastructure (e.g., Kubernetes) checks this address continuously. Depending on the HTTP status code returned from a GET request to this address the service will take action when it receives an "unhealthy" response. Since the definition of "healthy" or "unhealthy" varies with the type of service you provide, the Terminus integration supports you with a set of health indicators.',
  })
  @ApiResponse({
    status: 200,
    description: 'Success in the request',
    schema: {
      default: {
        status: 'success',
        info: {
          api: {
            status: 'up',
          },
          name_db: {
            status: 'up',
          },
        },
        error: {},
        details: {
          api: {
            status: 'up',
          },
          name_db: {
            status: 'up',
          },
          memory_heap: {
            status: 'up',
          },
          memory_rss: {
            status: 'up',
          },
          storage: {
            status: 'up',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
    schema: {
      default: {
        status: 'error',
        info: {
          api: {
            status: 'up',
          },
          token: {
            status: 'up',
          },
          name_db: {
            status: 'up',
          },
          memory_heap: {
            status: 'up',
          },
          storage: {
            status: 'up',
          },
        },
        error: {
          memory_rss: {
            status: 'down',
            message: 'Used rss exceeded the set threshold',
          },
        },
        details: {
          api: {
            status: 'up',
          },
          token: {
            status: 'up',
          },
          name_db: {
            status: 'up',
          },
          memory_heap: {
            status: 'up',
          },
          storage: {
            status: 'up',
          },
          memory_rss: {
            status: 'down',
            message: 'Used rss exceeded the set threshold',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized access',
    schema: {
      default: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Service not available, contact technical support',
    schema: {
      default: {
        status: 'error',
        info: {
          api: {
            status: 'up',
          },
          name_db: {
            status: 'up',
          },
          token: {
            status: 'up',
          },
        },
        error: {
          memory_heap: {
            status: 'down',
            message: 'Used heap exceeded the set threshold',
          },
          memory_rss: {
            status: 'down',
            message: 'Used rss exceeded the set threshold',
          },
          storage: {
            status: 'down',
            message: 'Used disk storage exceeded the set threshold',
          },
        },
        details: {
          api: {
            status: 'up',
          },
          token: {
            status: 'up',
          },
          name_db: {
            status: 'up',
          },
          memory_heap: {
            status: 'down',
            message: 'Used heap exceeded the set threshold',
          },
          memory_rss: {
            status: 'down',
            message: 'Used rss exceeded the set threshold',
          },
          storage: {
            status: 'down',
            message: 'Used disk storage exceeded the set threshold',
          },
        },
      },
    },
  })
  @Get()
  async check(): Promise<object> {
    try {
      const healthChecker = await this.health.check([
        async () => await this.db.pingCheck('express'),

        async () => await this.http.pingCheck('NestJs', 'https://nestjs.com/'),

        async () => await this.db.pingCheck('name_db'),

        async () => await this.token.checkTokenServiceHealth(),

        async () =>
          await this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),

        async () => await this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),

        async () =>
          await this.disk.checkStorage('storage', {
            thresholdPercent: 0.8,
            path: '/',
          }),
      ]);

      if (!healthChecker) {
        throw new Error('Health Check Failed');
      }

      return healthChecker.details;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }
}
