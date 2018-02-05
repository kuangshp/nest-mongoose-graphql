import * as  mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  address: String,
  mobile: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // 定义一个外键关联到用户表
})