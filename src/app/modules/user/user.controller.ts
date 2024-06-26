import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create User',
    description: '- Allows you to create complete user',
  })
  @ApiResponse({
    status: 201,
    description: 'Success in creation',
    schema: {
      default: {
        id: 1,
        username: 'johnD@e10',
        password: '12@#!10Aa',
        userIsActive: 1,
        createdAt: '2023-08-31T12:00:58.723Z',
        updatedAt: null,
        canceledAt: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
    schema: {
      default: {
        statusCode: 400,
        message: 'User already registered',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized access',
    schema: {
      default: [
        {
          statusCode: 401,
          message: 'Unauthorized',
        },
      ],
    },
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'List all Users',
    description:
      '- It has the function of listing all registered users, displaying all the details',
  })
  @ApiResponse({
    status: 200,
    description: 'Success in the request',
    schema: {
      default: [
        {
          id: 1,
          username: 'johnD@e10',
          password: '12@#!10Aa',
          userIsActive: 1,
          createdAt: '2023-08-31T12:00:58.723Z',
          updatedAt: null,
          canceledAt: null,
        },
        {
          id: 2,
          username: 'johnD@e20',
          userIsActive: 1,
          createdAt: '2023-09-01T12:00:58.723Z',
          updatedAt: null,
          canceledAt: null,
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
    schema: {
      default: {
        statusCode: 400,
        message: 'Users not found',
        error: 'Bad Request',
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
  @ApiQuery({
    name: 'skip',
    type: String,
    required: true,
    description: 'Start listing users from the first registered (e.g., 0)',
    example: '0',
  })
  @ApiQuery({
    name: 'take',
    type: String,
    required: true,
    description: 'How many users will be listed per page (e.g., 10)',
    example: '10',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<any> {
    return await this.userService.findAll(parseInt(take), parseInt(skip));
  }

  @ApiOperation({
    summary: 'Find unique User',
    description:
      '- Function that queries a registered user based on their identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Success in the request',
    schema: {
      default: {
        id: 1,
        username: 'johnD@e10',
        password: '12@#!10Aa',
        userIsActive: 1,
        createdAt: '2023-08-31T12:00:58.723Z',
        updatedAt: null,
        canceledAt: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
    schema: {
      default: {
        statusCode: 400,
        message: 'User #id not found',
        error: 'Bad Request',
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User ID (e.g., 1, 2, 3)',
    example: '1',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update information's of one unique User",
    description:
      "- Function that is responsible for updating some data in the user's registration",
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      default: {
        id: 1,
        username: 'D@e100',
        userIsActive: 1,
        createdAt: '2023-08-31T12:00:58.723Z',
        updatedAt: '2023-09-08T12:00:58.723Z',
        canceledAt: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
    schema: {
      default: {
        statusCode: 400,
        message: 'User #id not found',
        error: 'Bad Request',
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User ID (e.g., 1, 2, 3)',
    example: '1',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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

  @ApiOperation({
    summary: 'Disable a User',
    description:
      "- Function responsible for deactivating a user's registration",
  })
  @ApiResponse({
    status: 200,
    description: 'Success in the request',
    schema: {
      default: {
        id: 1,
        username: 'D@e100',
        userIsActive: 0,
        createdAt: '2023-08-31T12:00:58.723Z',
        updatedAt: '2023-09-08T12:00:58.723Z',
        canceledAt: '2023-09-15T12:00:58.723Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect request, incorrect or missing information',
    schema: {
      default: {
        statusCode: 400,
        message: 'User #id not found',
        error: 'Bad Request',
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User ID (e.g., 1, 2, 3)',
    example: '1',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }

    return await this.userService.remove(+id, authenticatedUser);
  }
}
