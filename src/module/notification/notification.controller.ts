import { Body, Controller, Get, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { NotificationDto } from "./dto/notification.dto";

@ApiTags("Thông báo")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/notification"
})

export class NotifiCationController {

    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    async getAll() {

        return await this.notificationService.getAll()
    }

    @Post()
    async create(@Body() body: NotificationDto) {

        return await this.notificationService.create(body)
    }
}