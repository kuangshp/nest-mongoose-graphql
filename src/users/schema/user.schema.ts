/**
 * 定义一个User的数据模型
 */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
  createAt: Date,
  updateAt: Date,
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createAt = new Date();
  } else {
    this.updateAt = new Date();
  }
  next();
})