import { ApiProperty } from "@nestjs/swagger"

export class NotificationDto {

    @ApiProperty({ type: String, required: false })
    image: string

    @ApiProperty({ type: String, required: true })
    title: string

    @ApiProperty({ type: String, required: true })
    shortContent: string

    @ApiProperty({ type: String, required: true })
    content: string

    @ApiProperty({ type: String, required: false })
    link: string

    @ApiProperty({ type: String, required: false })
    productId: string
}