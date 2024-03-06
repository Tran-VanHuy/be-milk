import { ApiProperty } from "@nestjs/swagger";

export class AdsDto {

    @ApiProperty({ type: String, required: true })
    name: string

    @ApiProperty({ type: Boolean, default: true, required: false })
    status: boolean
}