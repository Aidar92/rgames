import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './roles.model';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(dto: CreateRoleDto) {
    const role = new this.roleModel(dto);
    return role.save();
  }

  async getRoleByValue(value: string) {
    return this.roleModel.findOne({ value: value });
  }
}
