import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"

export class NotificationDto {

    @ApiProperty({ type: String, required: false })
    image: string

    @ApiProperty({ type: String, required: true })
    title: string

    @ApiProperty({ type: String, required: true })
    shortContent: string

    @ApiProperty({ type: String, required: false })
    content: string

    @ApiProperty({ type: String, required: false })
    link: string

    @ApiProperty({ type: String, required: false })
    productId: string

    @ApiProperty({ type: String, required: false, example: ["userId"] })
    users?: []

    @ApiProperty({ type: Boolean, required: true })
    allUser: boolean
}