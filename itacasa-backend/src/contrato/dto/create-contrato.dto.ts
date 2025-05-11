import { TipoOperacao } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContratoDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  dataInicio: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  dataFim?: Date | null;
  @ApiProperty({
    enum: TipoOperacao,
    enumName: 'TipoOperacao',
  })
  tipoOperacao: TipoOperacao;
}
