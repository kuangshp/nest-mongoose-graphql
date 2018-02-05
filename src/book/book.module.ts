import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema/book.schema';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

@Module({
  components: [BookService, BookResolver],
  exports: [BookResolver],
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])]
})

export class BookModule { }
