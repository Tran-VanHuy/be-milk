import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { InfoOrderDto, ListInfoOrderDto } from "./dto/info-order.dto";
import { ArayItemOrderDto, ItemOrderDto } from "./dto/item-order.dto";
import { ChangeStatusDto } from "./dto/change-status.dto";
import { Paging } from "src/common/pagination";

@ApiTags("Order")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/order"
})

export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @ApiQuery({ name: "skip", required: true, type: Number })
    @ApiQuery({ name: "limit", required: true, type: Number })
    @ApiQuery({ name: "userId", required: false, type: String })
    @ApiQuery({ name: "type", required: false, type: String })
    @Get()
    async getAll(@Query() {skip, limit}: Paging, @Query("userId") userId: string, @Query("type") type: string) {

        return await this.orderService.getAll(skip, limit, userId, type)
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

    @Put("/change-type")
    async changeStatus(@Body() body: ChangeStatusDto) {

        return await this.orderService.changeStatus(body)
    }
    @Get("/detail/:_id")
    async orderDetail(@Param("_id") _id: string) {

        return await this.orderService.orderDetail(_id)
    }

    @Get("/quantity-status-order")
    async quantityStatusOrder(@Query("userId") userId: string) {

        return await this.orderService.quantityTypeOrder(userId)
    }

    @Get("/bought-product")
    async bought(@Query("userId") userId: string) {

        return await this.orderService.bought(userId)
    }

    @Get("/rating-and-sale")
    ratingAndSale(@Query("productId") productId: string){

        return this.orderService.ratingAndSale(productId)
    }
}