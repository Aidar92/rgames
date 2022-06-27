import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../games/games.model';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Locale } from '../types';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @ApiProperty({ example: 'Indie', description: 'Genre name' })
  @Prop({
    required: true,
    unique: true,
    type: Object,
  })
  name: { [key in Locale]: string };

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }] })
  games: Game[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
