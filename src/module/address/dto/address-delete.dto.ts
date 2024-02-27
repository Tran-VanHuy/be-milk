import { ApiProperty } from "@nestjs/swagger";

export class AddressDetailDto {

    @ApiProperty({required: true, type: String})
    userId: string

    @ApiProperty({required: true, type: String})
    _id: string
}