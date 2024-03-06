import { Body, Controller, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { InfoOrderDto } from "./dto/info-order.dto";

@ApiTags("Order")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/order"
})

export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Post("/info")
    async infoOrder(@Body() body: InfoOrderDto) {

        return await this.orderService.infoOrder(body)
    }
}