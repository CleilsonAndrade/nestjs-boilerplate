import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const jwtSecret = configService.get('JWT_SECRET') || 'defaultSecret';

export const jwtConstants = {
  secret: jwtSecret,
};
