import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import axios from 'axios';

@Injectable()
export class TokenHealthIndicator extends HealthIndicator {
  async checkTokenServiceHealth(): Promise<any> {
    try {
      const username = process.env.JWT_TOKEN_USERNAME;
      const password = process.env.JWT_TOKEN_PASSWORD;
      const response = await axios.post(`localhost:3000/login`, {
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
