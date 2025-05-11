import { TipoImovel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ImovelDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  cidade: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  bairro: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  valor: number;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  areaConstruida: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  numQuartos: number;
  @ApiProperty({
    enum: TipoImovel,
    enumName: 'TipoImovel',
  })
  tipo: TipoImovel;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  tamanhoQuintal: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  andar: number | null;
}
