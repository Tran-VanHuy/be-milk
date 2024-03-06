import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"

export class CartDto {

    @ApiProperty({ required: true, type: String })
    productId: string

    @ApiProperty({ required: true, type: Types.ObjectId })
    product: string

    // @ApiProperty({ required: true, type: String })
    // name: string

    @ApiProperty({ required: false, type: String })
    image: string

    @ApiProperty({ required: false, type: String })
    infoId: string

    @ApiProperty({ required: false, type: String })
    msId: string

    @ApiProperty({ required: false, type: String })
    szId: string

    @ApiProperty({ required: false, type: Number })
    type: string

    @ApiProperty({ required: true, type: String })
    userId: string

    @ApiProperty({ required: true, type: Number })
    quantity: number
}