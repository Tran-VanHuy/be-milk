import { ApiProperty } from "@nestjs/swagger"

export class CategoryProductDto {

    @ApiProperty({required: true})
    name: string

    @ApiProperty({required: false, default: true})
    status: boolean
}