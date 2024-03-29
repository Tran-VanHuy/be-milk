import { ApiProperty } from "@nestjs/swagger"



export class ItemOrderDto {
    @ApiProperty({ type: String, required: true })
    productId: string

    @ApiProperty({ type: String, required: true })
    name: string

    @ApiProperty({ type: Number, required: true })
    quantity: number

    @ApiProperty({ type: Number, required: true })
    price: number

    @ApiProperty({ type: String, required: true })
    address: string

    @ApiProperty({ type: String, required: true })
    userId: string

    @ApiProperty({ type: String, required: true })
    deliveryAddress: string

    @ApiProperty({ type: String, required: false })
    nameItem: string

    @ApiProperty({ type: String, required: true })
    images: string

    @ApiProperty({ type: String, required: false })
    msId: string

    @ApiProperty({ type: String, required: false })
    szId: string
}

export class ArayItemOrderDto {

    @ApiProperty({ type: [ItemOrderDto], required: true })
    order: [ItemOrderDto]

    @ApiProperty({ type: String, required: true })
    userId: string

    @ApiProperty({ type: String, required: true })
    deliveryAddress: string
}