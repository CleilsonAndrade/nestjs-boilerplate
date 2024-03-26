import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Provide the user name' })
  @MaxLength(64)
  @ApiProperty({
    description: 'This field is to add the user_name',
    required: true,
    example: 'johnD@e10',
  })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: 'Provide the valid password' })
  @MaxLength(64)
  @ApiProperty({
    description: 'This field is to password',
    required: true,
    example: '12@#!10Aa',
  })
  password!: string;

  @IsInt()
  @IsNotEmpty({ message: 'Provide the info if the user is active' })
  @Min(0, { message: 'The user is active number cannot be negative' })
  @Max(1, { message: 'The user is active number cannot exceed 1' })
  @ApiProperty({
    description:
      'The user is a status to identify whether it represents whether it is active or not for use, example 0 for disabled and 1 for active',
    required: true,
    example: 1,
  })
  userIsActive!: number;
}
