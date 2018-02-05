import { Document } from 'mongoose';
export interface IAddress extends Document {
  readonly userId: String;
  readonly address: String;
  readonly mobile: String;
  readonly user: {
    readonly email: String;
    readonly name: String;
  }
}