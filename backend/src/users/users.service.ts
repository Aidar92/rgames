import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    const role = await this.roleService.getRoleByValue('USER');
    if (role) {
      await user.$set('roles', [role.id]);
      user.roles = [role];
    }
    return user.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByEmail(email: string) {
    return await this.userModel
      .findOne({
        email: email,
      })
      .exec();
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.updateOne({ $push: { roles: role.id } });
      return dto;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
