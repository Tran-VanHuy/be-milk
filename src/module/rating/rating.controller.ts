import { Body, Controller, Get, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { RatingService } from "./rating.service";
import { RatingDto } from "./dto/rating.dto";
import { Paging } from "src/common/pagination";

@ApiTags("Đánh giá")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/rating"
})

export class RatingController {

    constructor(private readonly ratingService: RatingService) {}

    @ApiQuery({name: "skip", type: Number, required: true})
    @ApiQuery({name: "limit", type: Number, required: true})
    @Get()
    getAll(@Query() {skip, limit}: Paging, @Query("productId") productId: string){

        return this.ratingService.getAll(skip, limit, productId);
    }

    @Post()
    create(@Body() body: RatingDto){

        return this.ratingService.create(body)
    }

}