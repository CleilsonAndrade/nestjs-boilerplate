/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiResponse({ status: 201, description: 'OK' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'List all Users' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Find unique User' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update informations of one unique User' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Disable a User' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
