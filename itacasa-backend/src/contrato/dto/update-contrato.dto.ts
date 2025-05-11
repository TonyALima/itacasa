import { TipoOperacao } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContratoDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  dataInicio?: Date;
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
    required: false,
  })
  tipoOperacao?: TipoOperacao;
}
