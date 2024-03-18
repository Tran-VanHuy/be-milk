import { ApiProperty } from "@nestjs/swagger"

export class NotificationOrderDto {

    @ApiProperty({ type: String, required: false })
    image: string

    @ApiProperty({ type: String, required: true })
    title: string

    @ApiProperty({ type: String, required: true })
    content: string

    @ApiProperty({ type: String, required: true })
    orderId: string

    @ApiProperty({ type: String, required: true })
    orderCode: string

    @ApiProperty({ type: String, required: false })
    userId: string

    @ApiProperty({ type: Boolean, required: false })
    readed: boolean
}