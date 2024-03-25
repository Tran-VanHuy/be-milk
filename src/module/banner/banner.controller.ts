import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, SetMetadata, UseGuards, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { BannerService } from "./banner.service";
import { BannerDto } from "./dto/banner.dto";
import { Paging } from "src/common/pagination";
import { RoleGuard } from "src/auth/role.guard";

@ApiTags("Banenr")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/banner"
})

export class BannerController {

    constructor(private readonly bannerService: BannerService) { }

    @ApiQuery({ name: "skip", type: Number, required: true })
    @ApiQuery({ name: "limit", type: Number, required: true })
    @ApiQuery({ name: "status", type: Boolean, required: false })
    @Get()
    async getAll(@Query() { skip, limit }: Paging, @Query("status") status: boolean) {

        return await this.bannerService.getAll(skip, limit, status)
    }

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Post()
    async create(@Body() body: BannerDto) {

        return await this.bannerService.create(body)
    }

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Delete(":_id")
    async delete(@Param("_id") _id: string) {

        return await this.bannerService.delete(_id)
    }

    @Get(":_id")
    async detail(@Param("_id") _id: string) {

        return await this.bannerService.detail(_id)
    }

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Put(":_id")
    async update(@Param("_id") _id: string, @Body() body: BannerDto) {
        return await this.bannerService.update(_id, body)
    }
}