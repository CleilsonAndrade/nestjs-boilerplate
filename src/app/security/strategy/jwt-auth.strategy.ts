import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { type JWTPayload } from '../dto/JWTPayload';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants,
      ignoreExpiration: false,
    });
  }

  async validate({ id }: JWTPayload): Promise<number> {
    try {
      const userID = await this.authService.validateUser(id);

      if (!userID) throw new Error('Not authorized');

      return userID;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
