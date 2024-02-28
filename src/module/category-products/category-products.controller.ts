import { Body, Controller, Get, HttpCode, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryProductsService } from "./category-products.service";
import { CategoryProductDto } from "./dto/category-product.dto";

@ApiTags("Danh mục sản phẩm")
@Controller({
    version: VERSION_NEUTRAL,
    path: "/v1"
})

export class CategoryProductsController {

    constructor(private readonly categoryProductsService: CategoryProductsService){}

    @Get("/category-products")
    @HttpCode(200)
    async getAll(){

        return await this.categoryProductsService.getAll()
    }

    @Post("/category-products")
    @HttpCode(200)
    async create(@Body() body: CategoryProductDto){

        return this.categoryProductsService.create(body)
    }
}