import { Body, Controller, Delete, Get, Param, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { VoucherService } from "./voucher.service";
import { VoucherDto } from "./dto/voucher.dto";

@ApiTags("Khuyến mãi")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1"
})

export class VoucherController {

    constructor(private readonly voucherService: VoucherService) { }

    @ApiQuery({ name: "product", type: String, required: false })
    @ApiQuery({ name: "status", type: Boolean, required: false })
    @Get("voucher")
    async getAll(@Query("product") product: string, @Query("status") status: boolean) {

        return this.voucherService.getAll(product, status)
    }

    @Post("voucher")
    async create(@Body() body: VoucherDto) {

        return this.voucherService.create(body)
    }

    @Delete("/voucher/:id")
    async delete(@Param("id") id: string) {

        return this.voucherService.delete(id);
    }

}
