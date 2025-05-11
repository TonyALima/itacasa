import { ApiProperty } from '@nestjs/swagger';

export class ConnectImovelDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
