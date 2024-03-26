import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { JWTPayload } from './dto/JWTPayload';
import { LoginDto } from './dto/Login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Generate Token',
    description: '- Allows you generate token',
  })
  @ApiResponse({
    status: 200,
    description: 'Success in the request',
    schema: {
      default: {
        access_token: 'TOKEN',
      },
      description: `${LoginDto.toString()}`,
    },
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;

    try {
      const user = await this.authService.validateUser(username, password);

      const token = await this.authService.generateJwtToken(user);

      return { access_token: token };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
