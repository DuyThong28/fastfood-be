import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create_address.dto';
import { UpdateAddressDto } from './dto/update_address.dto';
import { GetAddressDto } from './dto/get_address.dto';
import { GetAllAddressByAdminDto } from './dto/get_address_by_admin..dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}
  async createAddress(userId: string, dto: CreateAddressDto) {
    return this.prisma.address.create({
      data: {
        user_id: userId,
        address: dto.address,
        full_name: dto.fullName,
        phone_number: dto.phoneNumber,
      },
    });
  }
  async getAllAddress(query: GetAllAddressByAdminDto) {
    const addresses = await this.prisma.address.findMany({
      where: {
        address: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      skip: query.skip,
      take: query.take,
    });
    const count = await this.prisma.address.count({
      where: {
        address: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
    });
    return { addresses, count };
  }
  async getAllAddressByUser(userId: string, query: GetAddressDto) {
    const addresses = await this.prisma.address.findMany({
      where: {
        user_id: userId,
      },
      skip: query.skip,
      take: query.take,
    });
    const count = await this.prisma.address.count({
      where: {
        user_id: userId,
      },
    });
    return { addresses, count };
  }
  async updateAddress(id: number, dto: UpdateAddressDto) {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });
    if (!address) {
      throw new Error('Address not found');
    }
    return this.prisma.address.update({
      where: {
        id,
      },
      data: {
        address: dto.address ? dto.address : address.address,
        full_name: dto.fullName ? dto.fullName : address.full_name,
        phone_number: dto.phoneNumber ? dto.phoneNumber : address.phone_number,
      },
    });
  }
  async deleteAddress(id: number) {
    const address = await this.prisma.address.findFirst({
      where: {
        id,
      },
    });
    if (!address) {
      throw new Error('Address not found');
    }
    return this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
