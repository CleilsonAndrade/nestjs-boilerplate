import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
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
}
