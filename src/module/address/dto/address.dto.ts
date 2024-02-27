import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class AddressDto  {

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

    @ApiProperty({required: true, type: String})
    userId: string
}