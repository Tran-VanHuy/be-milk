import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"

export class OrderDto {

    @ApiProperty({ type: Types.ObjectId, required: true, example: ["orderId"] })
    orders: []

    @ApiProperty({ type: String, required: true })
    userId: string
}