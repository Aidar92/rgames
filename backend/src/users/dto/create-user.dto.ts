import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @IsString({ message: 'value is not string' })
  @IsEmail({}, { message: 'Email is not valid' })
  readonly email: string;
  @ApiProperty({ example: '13456', description: 'user password' })
  @IsString({ message: 'value is not string' })
  @Length(4, 16, { message: 'Value should be in range from 4 to 16' })
  readonly password: string;
}
