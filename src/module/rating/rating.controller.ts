import { Body, Controller, Get, Post, Query, SetMetadata, UseGuards, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { RatingService } from "./rating.service";
import { RatingDto } from "./dto/rating.dto";
import { Paging } from "src/common/pagination";
import { ReplyRatingDto } from "./dto/reply.dto";
import { RoleGuard } from "src/auth/role.guard";

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

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Post("/reply")
    reply(@Body() body: ReplyRatingDto){

        return this.ratingService.reply(body)
    }

}