import { ApiProperty } from "@nestjs/swagger"

class ListImage {
    @ApiProperty({ type: String })
    uid: string

    @ApiProperty({ type: String })
    name: string
}

class ItemSZ {

    @ApiProperty({ type: String })
    name: string

    @ApiProperty({ type: String })
    image: string

    @ApiProperty({ type: Number })
    price: number

    @ApiProperty({ type: Number })
    discount: number

    @ApiProperty({ type: Number })
    quantity: number
}

class ItemMS {

    @ApiProperty({ type: String })
    name: string

    @ApiProperty({ type: String })
    image: string

    @ApiProperty({ type: [ItemSZ] })
    itemSZ: [ItemSZ]

    @ApiProperty({ type: Number })
    price: number

    @ApiProperty({ type: Number })
    discount: number

    @ApiProperty({ type: Number })
    quantity: number
}

class InfoProducts {

    @ApiProperty({ type: String })
    ms: string

    @ApiProperty({ type: String })
    sz: string

    @ApiProperty({ type: [ItemMS] })
    itemMS: [ItemMS]

}

export class ProductsDto {

    @ApiProperty({ required: true, type: [ListImage] })
    images: [ListImage]

    @ApiProperty({ required: true })
    name: string

    @ApiProperty({ required: false, default: 0 })
    price: number

    @ApiProperty({ required: false, type: Number, default: 0 })
    discount: number

    @ApiProperty({ required: false, type: Number, default: 0 })
    quantity: number

    @ApiProperty({})
    content: string

    @ApiProperty({ type: InfoProducts })
    info: InfoProducts

    @ApiProperty({
        type: String,
        required: false,
        example: ['categoryId'],
    })
    categories: []

    @ApiProperty({ required: false, type: Number, default: 0 })
    transportFee: number

    @ApiProperty({
        type: Boolean,
        required: false,
    })
    status: boolean

    createdAt: string

    updatedAt: string
}