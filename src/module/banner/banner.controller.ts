import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { BannerService } from "./banner.service";
import { BannerDto } from "./dto/banner.dto";
import { Paging } from "src/common/pagination";

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

    @Post()
    async create(@Body() body: BannerDto) {

        return await this.bannerService.create(body)
    }

    @Delete(":_id")
    async delete(@Param("_id") _id: string) {

        return await this.bannerService.delete(_id)
    }

    @Get(":_id")
    async detail(@Param("_id") _id: string) {

        return await this.bannerService.detail(_id)
    }

    @Put(":_id")
    async update(@Param("_id") _id: string, @Body() body: BannerDto) {

        return await this.bannerService.update(_id, body)
    }
}