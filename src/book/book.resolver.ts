import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBook } from './interface/book.interface';
import { BookService } from './book.service';

@Resolver('book')
export class BookResolver {
  constructor(private readonly bookService: BookService) { }

  // 创建一条数据
  @Mutation('createBook')
  public async createBook(obj: any, args: any, context: any, info: any): Promise<IBook> {
    return await this.bookService.createBook(args);
  }

  // 根据id添加书籍
  @Mutation('addBookList')
  public async addBookList(obj: any, args: any, context: any, info: any): Promise<IBook> {
    return await this.bookService.addBookList(args._id, args.bookList);
  }

  // 根据id一次添加多个书籍
  @Mutation('addMoreBookList')
  public async addMoreBookList(obj: any, args: any, context: any, info: any): Promise<IBook> {
    return await this.bookService.addMoreBookList(args._id, args.bookLists);
  }

  // 根据id删除bookList中最后一条数据
  @Mutation('popBookList')
  public async popBookList(obj: any, args: any, context: any, info: any): Promise<IBook> {
    return await this.bookService.popBookList(args._id);
  }

  // 删除数组中指定一条数据
  @Mutation('removeBookListOne')
  public async removeBookListOne(obj: any, args:any, context: any, info: any): Promise<IBook> {
    return await this.bookService.removeBookListOne(args._id, args.bookListId);
  }

  // 修改数组中一个元素
  @Mutation('updateArrayOne')
  public async updateArrayOne(obj: any, args: any, context: any, info: any):Promise<IBook> {
    return await this.bookService.updateArrayOne(args._id, args.bookId, args.bookName);
  }

  // 查询数据
  @Query('allBook')
  public async allBook(obj: any, args: any, context: any, info: any): Promise<IBook[]> {
    console.log('obj==>:', obj, 'args===>', args, 'context==>', context, 'info==>', info);
    return await this.bookService.allBook();
  }

  // 根据id查询数据
  @Query('getBookById')
  public async getBookById(obj: any, args: any, context: any, info: any): Promise<IBook> {
    return await this.bookService.getBookById(args._id);
  }
}