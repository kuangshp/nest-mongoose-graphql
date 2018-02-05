import { Document } from 'mongoose';

export interface IBookList extends Document {
  readonly name: String;
  readonly price: Number;
}