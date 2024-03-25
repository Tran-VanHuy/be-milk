import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {

    @ApiProperty({required: true, type: String})
    userId: string
}