/**
 * 定义一个用户的接口
 */
import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: String;
  readonly email: String;
  readonly age: Number;
  readonly password: String;
  readonly createAt: Date;
  readonly updateAt: Date;
}