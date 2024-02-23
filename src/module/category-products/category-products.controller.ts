import { Controller, Get, HttpCode, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryProductsService } from "./category-products.service";

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

        return "hello";
    }
}