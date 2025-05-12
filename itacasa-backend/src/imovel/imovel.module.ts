import { Module } from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { ImovelController } from './imovel.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [ImovelController],
  providers: [ImovelService],
  exports: [ImovelService],
})
export class ImovelModule {}
