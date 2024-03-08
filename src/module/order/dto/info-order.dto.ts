import { ApiProperty } from "@nestjs/swagger";

export class InfoOrderDto {

    @ApiProperty({ required: true, type: String })
    productId: string

    @ApiProperty({ required: true, type: Number })
    type: number

    @ApiProperty({ required: true, type: Number })
    quantity: number

    @ApiProperty({ required: false, type: String })
    msId: string

    @ApiProperty({ required: false, type: String })
    szId: string
}

export class ListInfoOrderDto {

    @ApiProperty({ required: true, type: [InfoOrderDto] })
    products: InfoOrderDto[]

    @ApiProperty({ required: true, type: String })
    userId: string
}