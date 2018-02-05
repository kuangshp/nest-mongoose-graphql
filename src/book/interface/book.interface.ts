import { Document } from 'mongoose';
import { IBookList } from './book.list.interface';
import { IBookInfo } from './book.info.interface';

export interface IBook extends Document {
  readonly name: String;
  readonly bookList: Array<IBookList>;
  readonly info: IBookInfo;
}