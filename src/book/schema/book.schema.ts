import * as mongoose from 'mongoose';
import { BookListSchema } from './book.list.schema';
import { BookInfoSchema } from './book.info.schema';

export const BookSchema = new mongoose.Schema({
  name: String,
  bookList: [BookListSchema],
  info: BookInfoSchema
});