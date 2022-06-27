import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin', description: 'Unique role name' })
  readonly value: string;
  @ApiProperty({ example: 'Admin', description: 'Role description' })
  readonly description: string;
}
