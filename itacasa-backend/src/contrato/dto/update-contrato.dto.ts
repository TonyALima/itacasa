import { TipoOperacao } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateContratoDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dataInicio?: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dataFim?: Date | null;
  @ApiProperty({
    enum: TipoOperacao,
    enumName: 'TipoOperacao',
    required: false,
  })
  @IsOptional()
  @IsEnum(TipoOperacao)
  tipoOperacao?: TipoOperacao;
}
