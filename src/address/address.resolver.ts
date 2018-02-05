import {Resolver, Mutation, Query} from '@nestjs/graphql';
import { AddressService } from './address.service';
import { IAddress } from './interface/address.interface';

@Resolver('address')
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  // 新增一条地址信息
  @Mutation('createAddress')
  public async createAddress(obj: any, args: any, context: any, info: any): Promise<IAddress> {
    return await this.addressService.createAddress(args);
  }

  // 关联表查询
  @Query('getUser')
  public async getUser(obj: any, args: any, context: any, info: any): Promise<IAddress> {
    return await this.addressService.getUser(args._id);
  }
}