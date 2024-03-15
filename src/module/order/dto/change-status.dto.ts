import { ApiProperty } from "@nestjs/swagger";

export class ChangeStatusDto {

    @ApiProperty({ required: false, type: String })
    userId: string

    @ApiProperty({ required: false, type: String })
    type: string

    @ApiProperty({ required: false, type: String })
    orderId: string
}