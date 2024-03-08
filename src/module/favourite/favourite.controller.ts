import { Body, Controller, Get, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { FavouriteService } from "./favourite.service";
import { FavouriteDto } from "./dto/favourite.dto";
import { Paging } from "src/common/pagination";
import { checkFavouriteDto } from "./dto/check-favourite.dto";

@ApiTags("Yêu thích")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/favourite"
})

export class FavouriteController {

    constructor(private readonly favouriteService: FavouriteService) { }

    @Post()
    async create(@Body() body: FavouriteDto) {

        return await this.favouriteService.create(body)
    }

    @ApiQuery({ name: "skip", type: Number, required: true })
    @ApiQuery({ name: "limit", type: Number, required: true })
    @ApiQuery({ name: "userId", type: String, required: true })
    @Get()
    async getAll(@Query() { skip, limit }: Paging, @Query("userId") userId: string) {

        return await this.favouriteService.getAll(skip, limit, userId);
    }

    @Post("check")
    async checkFavourite(@Body() body: checkFavouriteDto) {

        return await this.favouriteService.checkFavourite(body)
    }
}