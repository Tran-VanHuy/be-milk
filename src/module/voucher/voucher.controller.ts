import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata, UseGuards, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { VoucherService } from "./voucher.service";
import { VoucherDto } from "./dto/voucher.dto";
import { RoleGuard } from "src/auth/role.guard";

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

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Post("voucher")
    async create(@Body() body: VoucherDto) {

        return this.voucherService.create(body)
    }

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Delete("/voucher/:id")
    async delete(@Param("id") id: string) {

        return this.voucherService.delete(id);
    }

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Put("/voucher/:_id")
    async update(@Param("_id") _id: string, @Body() body: VoucherDto) {

        return this.voucherService.update(_id, body);
    }

    @Get("/voucher/:_id")
    async detail(@Param("_id") _id: string) {

        return this.voucherService.detail(_id);
    }

}
