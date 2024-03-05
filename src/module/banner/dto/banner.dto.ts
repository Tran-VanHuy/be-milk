import { ApiProperty } from "@nestjs/swagger";

export class BannerDto {

    @ApiProperty({ type: String, required: true })
    name: string

    @ApiProperty({ type: Boolean, required: false, default: true })
    status: string
}