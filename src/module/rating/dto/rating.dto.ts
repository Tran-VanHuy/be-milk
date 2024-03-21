import { ApiProperty } from "@nestjs/swagger"

export class RatingDto {

    @ApiProperty({ type: [], required: false, example: [{name: "string", type: "string"}] })
    media: Media[]

    @ApiProperty({ type: String, required: true })
    productId: string

    @ApiProperty({ type: String, required: true })
    nameProduct: string

    @ApiProperty({ type: String, required: false })
    itemNameProduct: string

    @ApiProperty({ type: String, required: true })
    userId: string

    @ApiProperty({ type: String, required: false })
    nameUser: string

    @ApiProperty({ type: String, required: true })
    content: string

    @ApiProperty({ type: Number, required: true })
    rating: number
    
    @ApiProperty({ type: String, required: false })
    ItemOrderId: string
}

export class Media {

    @ApiProperty({ type: String, required: false })
    name: string

    @ApiProperty({ type: String, required: false })
    type: string
}
