import { ApiProperty } from "@nestjs/swagger";

export class checkFavouriteDto {

    @ApiProperty({ required: true, type: String })
    userId: string

    @ApiProperty({ required: true, type: String })
    productId: string
}