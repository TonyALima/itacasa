import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Imovel, User } from '@prisma/client';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class ImovelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findUserById(userId: string): Promise<User | null> {
    return this.usersService.findOne({ id: userId });
  }

  async create(data: Prisma.ImovelCreateInput): Promise<Imovel> {
    return this.prisma.imovel.create({
      data,
    });
  }

  async findAll(): Promise<Imovel[]> {
    return this.prisma.imovel.findMany();
  }

  async findOne(
    imovelWhereUniqueInput: Prisma.ImovelWhereUniqueInput,
  ): Promise<Imovel | null> {
    return this.prisma.imovel.findUnique({
      where: imovelWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ImovelWhereUniqueInput;
    where?: Prisma.ImovelWhereInput;
    orderBy?: Prisma.ImovelOrderByWithRelationInput;
  }): Promise<Imovel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.imovel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.ImovelWhereUniqueInput;
    data: Prisma.ImovelUpdateInput;
  }): Promise<Imovel> {
    const { where, data } = params;
    return this.prisma.imovel.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ImovelWhereUniqueInput): Promise<Imovel> {
    return this.prisma.imovel.delete({
      where,
    });
  }
}
