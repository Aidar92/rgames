import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Genre } from '../genres/genres.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Locale } from '../types';
import mongoose from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @ApiProperty({ example: 'Mario', description: 'Game title' })
  @Prop({
    required: true,
    type: Object,
  })
  title: { [key in Locale]: string };

  @ApiProperty({ example: 'Awesome game', description: 'Game description' })
  @Prop({
    required: true,
    type: Object,
  })
  description: { [key in Locale]: string };

  @ApiProperty({ example: '/test.png', description: 'Game capture' })
  @Prop({
    required: true,
  })
  image: string;

  @ApiProperty({ example: '0', description: 'Game rating' })
  @Prop({
    default: 0,
  })
  rating: number;

  @ApiProperty({ example: 'test', description: 'Game creator' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @ApiProperty({ example: [0], description: 'Game genres' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Genre.name }] })
  genres: Genre;
}

export const GameSchema = SchemaFactory.createForClass(Game);
