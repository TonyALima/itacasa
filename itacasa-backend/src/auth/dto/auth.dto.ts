import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    acess_token: string
}
