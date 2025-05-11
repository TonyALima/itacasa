import { TipoImovel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateImovelDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  cidade?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  bairro?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  valor?: number;
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
  })
  areaConstruida?: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  numQuartos?: number;
  @ApiProperty({
    enum: TipoImovel,
    enumName: 'TipoImovel',
    required: false,
  })
  tipo?: TipoImovel;
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
    nullable: true,
  })
  tamanhoQuintal?: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
    nullable: true,
  })
  andar?: number | null;
}
