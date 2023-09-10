import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty({ message: 'Provide the driver name' })
  @MaxLength(64)
  @ApiProperty({
    description: 'This field is to add the user_name',
    required: true,
    example: 'D@e100',
  })
  user_name!: string;
}
