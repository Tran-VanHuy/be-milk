import { Body, Controller, Delete, Get, Param, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { NotificationDto } from "./dto/notification.dto";

@ApiTags("Thông báo")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/notification"
})

export class NotifiCationController {

    constructor(private readonly notificationService: NotificationService) { }

    @ApiQuery({ name: "userId", type: String, required: false })
    @Get()
    async getAll(@Query("userId") userId: string) {

        return await this.notificationService.getAll(userId)
    }

    @Post()
    async create(@Body() body: NotificationDto) {

        return await this.notificationService.create(body)
    }

    @Delete(":_id")
    async delete(@Param("_id") _id: string) {

        return await this.notificationService.delete(_id)
    }
}