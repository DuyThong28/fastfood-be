import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create_address.dto';
import { StandardResponse } from 'src/utils/response.dto';
import {
  TUserSession,
  UserSession,
} from 'src/common/decorators/user-session.decorator';
import { UpdateAddressDto } from './dto/update_address.dto';
import { GetAddressDto } from './dto/get_address.dto';

import { GetAllAddressByAdminDto } from './dto/get_address_by_admin..dto';
import { END_POINTS } from 'src/constants/end_points';
import HttpStatusCode from 'src/constants/http_status_code';
import { PageResponseMetaDto } from 'src/utils/page_response_meta.dto';
import { PageResponseDto } from 'src/utils/page_response.dto';
const {
  ADDRESS: { BASE, CREATE, GET_ALL_BY_ADMIN, GET_ALL_BY_USER, UPDATE, DELETE },
} = END_POINTS;

@Controller(BASE)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post(CREATE)
  async createAddress(
    @UserSession() user: TUserSession,
    @Body() dto: CreateAddressDto,
  ) {
    const address = await this.addressService.createAddress(user.id, dto);
    return new StandardResponse(
      address,
      'Address created successfully',
      HttpStatusCode.CREATED,
    );
  }
  @Get(GET_ALL_BY_USER)
  async getAllAddressByUser(
    @UserSession() user: TUserSession,
    @Query() query: GetAddressDto,
  ) {
    const { addresses, count } = await this.addressService.getAllAddressByUser(
      user.id,
      query,
    );
    const meta = new PageResponseMetaDto({
      pageOptionsDto: query,
      itemCount: count,
    });
    return new PageResponseDto(addresses, meta);
  }
  @Post(UPDATE)
  async updateAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    const result = await this.addressService.updateAddress(id, dto);
    return new StandardResponse(
      result,
      'Address updated successfully',
      HttpStatusCode.OK,
    );
  }
  @Get(GET_ALL_BY_ADMIN)
  async getAllAddress(@Query() query: GetAllAddressByAdminDto) {
    const { addresses, count } = await this.addressService.getAllAddress(query);
    const meta = new PageResponseMetaDto({
      pageOptionsDto: query,
      itemCount: count,
    });
    return new PageResponseDto(addresses, meta);
  }
  @Delete(DELETE)
  async deleteAddress(@Param('id', ParseIntPipe) id: number) {
    await this.addressService.deleteAddress(id);
    return new StandardResponse(
      null,
      'Address deleted successfully',
      HttpStatusCode.OK,
    );
  }
}
