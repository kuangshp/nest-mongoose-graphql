import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GQLModule } from './graphql/gql.module';
import { UserModule } from './users/user.module';
import { BookModule } from './book/book.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [DatabaseModule, GQLModule, UserModule, BookModule, AddressModule]
})
export class ApplicationModule { }
