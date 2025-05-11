import { TipoUser } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  nome?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  cpf?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  email?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  senha?: string;
  @ApiProperty({
    enum: TipoUser,
    enumName: 'TipoUser',
    required: false,
  })
  tipo?: TipoUser;
}
