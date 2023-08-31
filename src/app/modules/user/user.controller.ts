import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'Success in creation' })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
  })
  @ApiResponse({ status: 401, description: 'Not authorized access' })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }

    return await this.userService.create(createUserDto, authenticatedUser);
  }

  @ApiOperation({ summary: 'List all Users' })
  @ApiResponse({ status: 200, description: 'Success in the request' })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
  })
  @ApiResponse({ status: 401, description: 'Not authorized access' })
  @Get()
  async findAll(): Promise<any> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Find unique User' })
  @ApiResponse({ status: 200, description: 'Success in the request' })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
  })
  @ApiResponse({ status: 401, description: 'Not authorized access' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.userService.findOne(+id);
  }

  @ApiOperation({ summary: "Update information's of one unique User" })
  @ApiResponse({ status: 200, description: 'OK' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }
    return await this.userService.update(+id, updateUserDto, authenticatedUser);
  }

  @ApiOperation({ summary: 'Disable a User' })
  @ApiResponse({ status: 200, description: 'Success in the request' })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
  })
  @ApiResponse({ status: 401, description: 'Not authorized access' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }

    return await this.userService.remove(+id, authenticatedUser);
  }
}
