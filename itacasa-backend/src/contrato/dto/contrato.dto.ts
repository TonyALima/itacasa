import { TipoOperacao } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContratoDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  dataInicio: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  dataFim: Date | null;
  @ApiProperty({
    enum: TipoOperacao,
    enumName: 'TipoOperacao',
  })
  tipoOperacao: TipoOperacao;
}
