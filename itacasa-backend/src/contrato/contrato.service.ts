import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Contrato, User, Imovel } from '@prisma/client';
import { UsersService } from 'src/user/user.service';
import { ImovelService } from 'src/imovel/imovel.service';

@Injectable()
export class ContratoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly imovelService: ImovelService,
  ) {}

  async findUserById(userId: string): Promise<User | null> {
    return this.usersService.findOne({ id: userId });
  }

  async findImovelById(imovelId: string): Promise<Imovel | null> {
    return this.imovelService.findOne({ id: imovelId });
  }  

  async create(data: Prisma.ContratoCreateInput): Promise<Contrato> {
    return this.prisma.contrato.create({
      data,
    });
  }

  async findAll(): Promise<Contrato[]> {
    return this.prisma.contrato.findMany();
  }

  async findOne(
    contratoWhereUniqueInput: Prisma.ContratoWhereUniqueInput,
  ): Promise<Contrato | null> {
    return this.prisma.contrato.findUnique({
      where: contratoWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContratoWhereUniqueInput;
    where?: Prisma.ContratoWhereInput;
    orderBy?: Prisma.ContratoOrderByWithRelationInput;
  }): Promise<Contrato[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.contrato.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.ContratoWhereUniqueInput;
    data: Prisma.ContratoUpdateInput;
  }): Promise<Contrato> {
    const { where, data } = params;
    return this.prisma.contrato.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ContratoWhereUniqueInput): Promise<Contrato> {
    return this.prisma.contrato.delete({
      where,
    });
  }
}
