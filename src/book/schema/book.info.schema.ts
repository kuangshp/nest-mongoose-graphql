import * as mongoose from 'mongoose';
export const BookInfoSchema = new mongoose.Schema({
  page: Number,
  category: String,
  publishingCompany: String,
})