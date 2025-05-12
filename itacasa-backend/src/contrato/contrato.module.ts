import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { UsersModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImovelModule } from 'src/imovel/imovel.module';

@Module({
  imports: [PrismaModule, UsersModule, ImovelModule],
  controllers: [ContratoController],
  providers: [ContratoService],
})
export class ContratoModule {}
