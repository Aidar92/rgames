import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.model';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty({ example: 'Admin', description: 'Unique role name' })
  @Prop({
    required: true,
    unique: true,
  })
  value: string;

  @ApiProperty({ example: 'Admin', description: 'Role description' })
  @Prop({
    required: true,
  })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
