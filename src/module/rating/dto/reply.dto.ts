import { ApiProperty } from "@nestjs/swagger";

export class ReplyRatingDto {

    @ApiProperty({ type: String, required: true })
    id: string

    @ApiProperty({ type: String, required: false })
    reply: string
}