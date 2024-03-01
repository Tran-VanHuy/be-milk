import { ApiProperty } from "@nestjs/swagger"

export class VoucherDto {


    @ApiProperty({ required: true, type: String })
    name: string

    @ApiProperty({ required: false, type: String })
    content: string

    @ApiProperty({ required: true, type: Number })
    discount: number

    @ApiProperty({ required: false, type: Number, default: 0 })
    minimum: number

    @ApiProperty({ required: true, type: [], example: ["idProducts"] })
    products: string

    @ApiProperty({ required: false, type: Boolean, default: true })
    status: boolean
}