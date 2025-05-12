import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContratoModule } from './contrato/contrato.module';
import { ImovelModule } from './imovel/imovel.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, ContratoModule, ImovelModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
