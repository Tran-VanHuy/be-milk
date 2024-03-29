import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata, UseGuards, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { NotificationDto } from "./dto/notification.dto";
import { NotificationOrderDto } from "./dto/notification-order.dto";
import { RoleGuard } from "src/auth/role.guard";

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

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Delete(":_id")
    async delete(@Param("_id") _id: string) {

        return await this.notificationService.delete(_id)
    }

    @UseGuards(RoleGuard) // Apply the RoleGuard
    @SetMetadata('role', 'ADMIN')
    @Post("/create/order")
    async createNotificationOrder(@Body() body: NotificationOrderDto) {

        return await this.notificationService.createNotificationOrder(body)
    }

    @Get("/get/order/:userId")
    async getAllNotificationOrder(@Param("userId") userId: string) {

        return await this.notificationService.getAllNotificationOrder(userId)
    }

    @Get("/get/check-read/:_id")
    async checkReadNotiOrder(@Param("_id") _id: string) {

        return await this.notificationService.checkReadNotiOrder(_id)
    }

    @Get(":_id")
    async detal(@Param("_id") _id: string) {

        return await this.notificationService.detail(_id)
    }

    @Put(":_id")
    async update(@Param("_id") _id: string, @Body() body: NotificationDto) {

        return await this.notificationService.update(_id, body)
    }
}