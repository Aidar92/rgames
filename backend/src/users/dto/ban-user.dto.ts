import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: '1', description: 'User id' })
  readonly userId: number;
  @ApiProperty({ example: 'Reason', description: 'User ban reason' })
  readonly banReason: string;
}
