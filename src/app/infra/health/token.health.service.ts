import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicator } from '@nestjs/terminus';
import axios from 'axios';

@Injectable()
export class TokenHealthIndicator extends HealthIndicator {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async checkTokenServiceHealth(): Promise<any> {
    try {
      const username = this.configService.get('JWT_TOKEN_USERNAME');
      const password = this.configService.get('JWT_TOKEN_PASSWORD');
      const baseURL = this.configService.get('JWT_BASE_URL_TOKEN');
      // URL to get token via axios
      const response = await axios.post(baseURL, {
        username,
        password,
      });
      const { data } = response;
      return {
        token: {
          status: data.code === 0 ? 'up' : 'down',
        },
      };
    } catch (error) {
      return {
        token: {
          status: 'down',
        },
      };
    }
  }
}
