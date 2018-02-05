import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  // 查询全部的用户
  @Query('allUsers')
  public async allUsers(obj: any, args: IUser, context: any, info: any): Promise<IUser[]> {
    return await this.userService.allUsers();
  }

  // 查询一个用户
  @Query('getUserByName')
  public async getUserByName(obj: any, args: IUser, context: any, info: any): Promise<IUser> {
    return await this.userService.getUserByName(args.name);
  }

  // 根据id查询用户
  @Query('getUserById')
  public async getUserById(obj: any, args: IUser, context: any, info: any):Promise<IUser> {
    return await this.userService.getUserById(args._id);
  }

  // 创建一个用户
  @Mutation('createUser')
  public async createUser(obj: any, args: IUser, context: any, info: any):Promise<IUser> {
    return await this.userService.createUser(args);
  }

  // 修改一个用户
  @Mutation('updateUser')
  public async updateUser(obj: any, args: IUser, context: any, info: any): Promise<IUser> {
    return await this.userService.updateUser(args._id, args)
  }

  // 删除数据
  @Mutation('deleteUser')
  public async deleteUser(obj: any, args: IUser, context: any, info: any): Promise<IUser> {
    return this.userService.deleteUser(args._id);
  }
}