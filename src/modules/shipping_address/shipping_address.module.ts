import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddressController } from './shipping_address.controller';

@Module({
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
})
export class ShippingAddressModule {}
