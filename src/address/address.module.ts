import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';
import { AddressSchema } from './schema/address.schema';

@Module({
  components: [AddressService, AddressResolver],
  exports: [AddressResolver],
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }])]
})

export class AddressModule {} 