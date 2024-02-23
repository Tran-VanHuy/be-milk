import { Body, Controller, Get, HttpCode, Post, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { ProductsDto } from "./dto/products.dto";
import { Paging } from "src/common/pagination";

@ApiTags("Sản phẩm")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1"
})

export class ProductsController {

    constructor(private readonly productsService: ProductsService){}

    @ApiQuery({name: "skip", type: Number, required: true})
    @ApiQuery({name: "limit", type: Number, required: true})
    @HttpCode(200)
    @Get("/products")
    async getAll(@Query() {skip, limit}: Paging){

        return await this.productsService.getAll(skip, limit)
    }

    @Post("/products")
    @HttpCode(200)
    async create(@Body() body: ProductsDto){

        const res = await this.productsService.create(body);
        return res;
    }
}