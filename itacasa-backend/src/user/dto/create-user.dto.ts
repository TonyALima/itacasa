import { TipoUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
  })
  nome: string;
  @ApiProperty({
    type: 'string',
  })
  cpf: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  senha: string;
  @ApiProperty({
    enum: TipoUser,
    enumName: 'TipoUser',
  })
  tipo: TipoUser;
}
