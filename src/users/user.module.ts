import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  components: [UserService, UserResolver],
  exports: [UserResolver],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
})

export class UserModule { }