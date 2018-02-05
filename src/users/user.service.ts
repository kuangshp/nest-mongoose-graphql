import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { UserSchema } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Component()
export class UserService {
  // 在constructor中使用Injetc注入UserSchema
  constructor( @InjectModel(UserSchema) private readonly userSchema: Model<IUser>) { }

  // 查询全部的用户
  public async allUsers(): Promise<IUser[]> {
    return await this.userSchema.find().exec();
  }

  // 查询一个用户
  public async getUserByName(name:String): Promise<IUser> {
    return await this.userSchema.findOne({name}).exec();
  }

  // 根据id查询用户
  public async getUserById(_id: String): Promise<IUser> {
    return await this.userSchema.findById({_id}).exec();
  }

  // 创建一个用户的
  public async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userSchema(createUserDto);
    return await newUser.save();
  }

  // 修改用户的
  public async updateUser(_id: String, args: IUser): Promise<IUser> {
    return await this.userSchema.findOneAndUpdate({_id}, {args}).exec();
  }

  // 删除用户
  public async deleteUser(_id: String): Promise<IUser> {
    return await this.userSchema.findOneAndRemove({_id}).exec();
  }
}