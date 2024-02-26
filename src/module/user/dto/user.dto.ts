import { ApiProperty } from "@nestjs/swagger";

class Address  {

    @ApiProperty({required: true, type: String})
    name: string;

    @ApiProperty({required: true, type: String})
    phone: string;

    @ApiProperty({required: true, type: String})
    city: string

    @ApiProperty({required: true, type: String})
    district: string

    @ApiProperty({required: true, type: String})
    commune: string

    @ApiProperty({required: true, type: String})
    specificAddress: string

    @ApiProperty({required: true, type: Boolean, default: false})
    default: boolean
}

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

    @ApiProperty({ type: [Address], required:false })
    address:  [Address]
}