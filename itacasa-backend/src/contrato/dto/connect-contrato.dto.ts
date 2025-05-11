import { ApiProperty } from '@nestjs/swagger';

export class ConnectContratoDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  id?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  imovelId?: string;
}
