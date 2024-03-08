import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class FavouriteDto {

    @ApiProperty({ type: String, required: false })
    userId: string

    @ApiProperty({ type: Types.ObjectId, required: true, example: "productId" })
    product: []
}