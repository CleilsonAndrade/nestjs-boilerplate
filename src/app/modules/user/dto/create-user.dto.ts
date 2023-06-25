import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @ApiProperty({
    description: 'This field id to add the userID',
    required: true,
    example: 1234,
  })
  userID!: number;

  @IsString()
  @IsNotEmpty({ message: 'Provide the driver name' })
  @MaxLength(64)
  @ApiProperty({
    description: 'This field is to add the user_name',
    required: true,
    example: 'johnD@e10',
  })
  user_name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Provide the valid password' })
  @MaxLength(64)
  @ApiProperty({
    description: 'This field is to password',
    required: true,
    example: '12@#!10Aa',
  })
  password!: string;
}
