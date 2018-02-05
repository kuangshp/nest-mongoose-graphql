import {Component} from '@nestjs/common';
import { IAddress } from './interface/address.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AddressSchema } from './schema/address.schema';
import { Model } from 'mongoose';

@Component()
export class AddressService {
  constructor(@InjectModel(AddressSchema) private readonly addressSchema: Model<IAddress>) { }
  // 新增一条数据
  public async createAddress(address: CreateAddressDto): Promise<IAddress> {
    return await this.addressSchema.create(address);
  }

  // 关联表的查询
  public async getUser(_id: String): Promise<IAddress> {
    return await this.addressSchema.findById({_id}).populate('userId').exec();
  }
}