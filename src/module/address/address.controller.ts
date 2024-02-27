import { Body, Controller, Param, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddressService } from "./address.service";
import { AddressDto } from "./dto/address.dto";
import { AddressDetailDto } from "./dto/address-delete.dto";

@ApiTags("Địa chỉ")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1"
})

export class AddressController {

    constructor(private readonly addressService: AddressService){}

    @ApiOperation({summary: "Thêm địa chỉ"})
    @Post("/address")
    async create(@Body() body: AddressDto){

        return this.addressService.create(body)
    }

    @ApiOperation({summary: "Xóa địa chỉ"})
    @Post('/delete/address')
    async delete(@Body() body: AddressDetailDto){

        return this.addressService.delete(body)
    }

    @ApiOperation({summary: "Chi tiết địa chỉ"})
    @Post('/detail/address')
    async detail(@Body() body: AddressDetailDto){

        return this.addressService.detail(body)
    }

    @ApiOperation({summary: "Cập nhật địa chỉ"})
    @Post('/update/address/:_id')
    async update(@Param("_id") _id: string, @Body() body: AddressDto){

        return this.addressService.update(_id, body)
    }
}