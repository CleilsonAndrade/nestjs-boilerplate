import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { type LoginDto } from '../dto/Login.dto';
import { jwtConstants } from '../strategy/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  async validate({ username, password }: LoginDto): Promise<any> {
    try {
      const userPassport = await this.authService.validateUser(
        username,
        password,
      );

      if (!userPassport) throw new Error('Not authorized');

      return userPassport;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
