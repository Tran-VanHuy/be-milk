import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AdsService } from "./ads.service";
import { AdsDto } from "./dto/ads.dto";
import { Paging } from "src/common/pagination";

@ApiTags("Ảnh quảng cáo")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/ads"
})

export class AdsController {

    constructor(private readonly adsService: AdsService) { }

    @ApiQuery({ name: "skip", type: Number, required: true })
    @ApiQuery({ name: "limit", type: Number, required: true })
    @ApiQuery({ name: "status", type: Boolean, required: false })
    @Get()
    async getAll(@Query() { skip, limit }: Paging, @Query("status") status: boolean) {

        return await this.adsService.getAll(skip, limit, status)
    }

    @Post()
    async create(@Body() body: AdsDto) {

        return await this.adsService.create(body)
    }

    @Get(":_id")
    async detail(@Param("_id") _id: string) {

        return await this.adsService.detail(_id)
    }

    @Put(":_id")
    async update(@Param("_id") _id: string, @Body() body: AdsDto) {

        return await this.adsService.update(_id, body)
    }

    @Delete(":_id")
    async delete(@Param("_id") _id: string) {

        return await this.adsService.delete(_id)
    }
}