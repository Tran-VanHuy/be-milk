import { Body, Controller, Get, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { CartDto } from "./dto/cart.dto";

@ApiTags("Giỏ hàng")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1/cart"
})

export class CartController {

    constructor(private readonly cartService: CartService) { }

    @Post()
    async create(@Body() body: CartDto) {

        return await this.cartService.create(body)
    }

    @ApiQuery({name: "userId", required: true, type: String})
    @Get()
    async getAll(@Query("userId") userId: string){

        return await this.cartService.getAll(userId)
    }

    @ApiSecurity('basic')
    @ApiQuery({name: "userId", type: String, required: true})
    @Get("/check/total")
    async totalCart(@Query("userId") userId: string){
        return await this.cartService.totalCart(userId)
    }

}