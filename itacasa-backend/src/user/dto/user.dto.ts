import { TipoUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
    enum: TipoUser,
    enumName: 'TipoUser',
  })
  tipo: TipoUser;
}
