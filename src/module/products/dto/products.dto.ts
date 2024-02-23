import { ApiProperty } from "@nestjs/swagger"

class ListImage {

    @ApiProperty({type: String})
    name: string
}

class ItemSZ {

    @ApiProperty({type: String})
    name: string

    @ApiProperty({type: String})
    image: string

    @ApiProperty({type: Number})
    price: number

    @ApiProperty({type: Number})
    discount: number
}

class ItemMS {

    @ApiProperty({type: String})
    name: string

    @ApiProperty({type: String})
    image: string

    @ApiProperty({type: [ItemSZ]})
    itemSZ: [ItemSZ]
}

class InfoProducts {

    @ApiProperty({type: String})
    ms: string

    @ApiProperty({type: [ItemMS]})
    itemMS: [ItemMS]

}

export class ProductsDto {

    @ApiProperty({required: true, type: [ListImage]})
    images: [ListImage]

    @ApiProperty({required: true})
    name: string

    @ApiProperty({})
    sale: number

    @ApiProperty({})
    point: number

    @ApiProperty({})
    content: string

    @ApiProperty({type: [InfoProducts]})
    info: [InfoProducts]

    @ApiProperty({
        type: Array,
        required: false,
        example: ['string'],
    })
    categories: []

    createdAt: string

    updatedAt: string
}