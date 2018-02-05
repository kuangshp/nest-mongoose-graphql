import {Document} from 'mongoose';

export interface IBookInfo extends Document {
  readonly page: Number;
  readonly category: String;
  readonly publishingCompany: String;
}