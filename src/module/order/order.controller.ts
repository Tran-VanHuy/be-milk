import { Body, Controller, Get, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { InfoOrderDto } from "./dto/info-order.dto";
import { ArayItemOrderDto, ItemOrderDto } from "./dto/item-order.dto";

@ApiTags("Order")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/order"
})

export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Get()
    async getAll() {

        return await this.orderService.getAll()
    }

    @Post()
    async create(@Body() body: ArayItemOrderDto) {

        return await this.orderService.create(body)
    }
    @Post("/info")
    async infoOrder(@Body() body: InfoOrderDto) {

        return await this.orderService.infoOrder(body)
    }
}