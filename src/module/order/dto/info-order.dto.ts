import { ApiProperty } from "@nestjs/swagger";

export class InfoOrderDto {

    @ApiProperty({ required: true, type: String })
    productId: string

    @ApiProperty({ required: true, type: Number })
    type: number

    @ApiProperty({ required: true, type: Number })
    quantity: number
}