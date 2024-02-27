import { ApiProperty } from "@nestjs/swagger";


export class UserDto {
    @ApiProperty({
        example: 'string',
        required: true,
    })
    userId: string;

    @ApiProperty({
        example: 'string',
        required: true,
    })
    name: string;

    @ApiProperty({
        example: 'string',
        required: true,
    })
    avatar: string;

    @ApiProperty({
        example: 'string',
        required: true,
    })
    phone: string;

    @ApiProperty({ type: String, required:false, example: ['addressId'] })
    address:  []
}