import { Body, Controller, Delete, Get, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { InfoOrderDto, ListInfoOrderDto } from "./dto/info-order.dto";
import { ArayItemOrderDto, ItemOrderDto } from "./dto/item-order.dto";

@ApiTags("Order")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/order"
})

export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @ApiQuery({ name: "userId", required: true, type: String })
    @ApiQuery({ name: "type", required: false, type: String })
    @Get()
    async getAll(@Query("userId") userId: string, @Query("type") type: string) {

        return await this.orderService.getAll(userId, type)
    }

    @Post()
    async create(@Body() body: ArayItemOrderDto) {

        return await this.orderService.create(body)
    }
    @Post("/info")
    async infoOrder(@Body() body: InfoOrderDto) {

        return await this.orderService.infoOrder(body)
    }

    @Post("/list-info")
    async listInfoOrder(@Body() body: ListInfoOrderDto) {

        return await this.orderService.listInfoOrder(body)
    }

    @Delete("/delete")
    async delete(@Query("_id") _id: string, @Query("userId") userId: string) {

        return await this.orderService.delete(_id, userId)
    }
}