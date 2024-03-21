import { Body, Controller, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RatingService } from "./rating.service";
import { RatingDto } from "./dto/rating.dto";

@ApiTags("Đánh giá")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/rating"
})

export class RatingController {

    constructor(private readonly ratingService: RatingService) {}

    @Post()
    create(@Body() body: RatingDto){

        return this.ratingService.create(body)
    }

}