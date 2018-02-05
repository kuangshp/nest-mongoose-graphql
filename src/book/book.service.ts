import { Component } from '@nestjs/common';
import { IBook } from './interface/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BookSchema } from './schema/book.schema';
import { Model } from 'mongoose';
import { IBookList } from './interface/book.list.interface';

@Component()
export class BookService {
  constructor( @InjectModel(BookSchema) private readonly bookSchema: Model<IBook>) { }

  // 创建book的方法
  public async createBook(createBookDto: CreateBookDto): Promise<IBook> {
    const newBook = new this.bookSchema(createBookDto);
    return await newBook.save();
  }

  // 添加书籍
  public async addBookList(_id: String, bookList: IBookList): Promise<IBook> {
    console.log(bookList)
    // return await this.bookSchema.findByIdAndUpdate({ _id }, { $push: { 'bookList': bookList } }).exec();
    return await this.bookSchema.findByIdAndUpdate({ _id }, { $push: { bookList } }).exec();
  }

  // 一次添加多条数据
  public async addMoreBookList(_id: String, bookLists: IBookList): Promise<IBook> {
    return await this.bookSchema.findByIdAndUpdate({ _id }, { $addToSet: { 'bookList': { $each: bookLists } } }).exec();
  }

  // 删除最后一条数据
  public async popBookList(_id: String): Promise<IBook> {
    return await this.bookSchema.findByIdAndUpdate({ _id }, { $pop: { 'bookList': 1 } }).exec();
  }

  // 删除数组中指定的一条数据
  public async removeBookListOne(_id: String, bookListId: String):Promise<IBook> {
    return await this.bookSchema.findByIdAndUpdate({_id}, { $pull: {bookList: {_id: bookListId}}}).exec();
  }

  // 修改数组中一个元素
  public async updateArrayOne(_id: String, bookId: String, bookName: String): Promise<IBook> {
    console.log(_id, bookId, bookName)
    return await this.bookSchema.updateOne({'_id': _id, 'bookList._id': bookId}, { $set: {"bookList.$.bookName": bookName}}).exec();
  }
  
  // 查询全部的书籍
  public async allBook(): Promise<IBook[]> {
    return await this.bookSchema.find().exec();
  }

  // 根据id查询书籍
  public async getBookById(_id: String): Promise<IBook> {
    return await this.bookSchema.findById({ _id }).exec();
  }

}