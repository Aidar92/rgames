import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Game } from '../games/games.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '13456', description: 'user password' })
  @Prop({
    required: true,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'user banned or not' })
  @Prop()
  banned: boolean;

  @ApiProperty({ example: 'Reason', description: 'User ban reason' })
  @Prop()
  banReason: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Game.name }] })
  games: Game[];
}

export const UserSchema = SchemaFactory.createForClass(User);
