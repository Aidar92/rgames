import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Mario', description: 'Game title' })
  readonly title: string;
  @ApiProperty({ example: 'Awesome game', description: 'Game description' })
  readonly description: string;
  @ApiProperty({
    example: ['62822acf3b326747811b6e54'],
    description: 'Game genres',
  })
  readonly genres: string;
}
