import { TipoOperacao } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContratoDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  dataInicio: Date;
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
  })
  @IsNotEmpty()
  @IsEnum(TipoOperacao)
  tipoOperacao: TipoOperacao;
}
