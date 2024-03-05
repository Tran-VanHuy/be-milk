import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CategoryProductsService } from "./category-products.service";
import { CategoryProductDto } from "./dto/category-product.dto";
import { Paging } from "src/common/pagination";

@ApiTags("Danh mục sản phẩm")
@Controller({
    version: VERSION_NEUTRAL,
    path: "/v1"
})

export class CategoryProductsController {

    constructor(private readonly categoryProductsService: CategoryProductsService) { }

    @ApiQuery({ name: "skip", type: Number, required: true })
    @ApiQuery({ name: "limit", type: Number, required: true })
    @ApiQuery({ name: "status", type: Boolean, required: false })
    @Get("/category-products")
    @HttpCode(200)
    async getAll(@Query() { skip, limit }: Paging, @Query("status") status: boolean) {

        return await this.categoryProductsService.getAll(skip, limit, status)
    }

    @Post("/category-products")
    @HttpCode(200)
    async create(@Body() body: CategoryProductDto) {

        return this.categoryProductsService.create(body)
    }

    @Get("/category-products/:_id")
    async detail(@Param("_id") _id: string) {

        return this.categoryProductsService.detail(_id)
    }

    @Put("/category-products/:_id")
    async update(@Param("_id") _id: string, @Body() body: CategoryProductDto) {

        return this.categoryProductsService.update(_id, body)
    }

    @Delete("/category-products/:_id")
    async delete(@Param("_id") _id: string) {

        return this.categoryProductsService.delete(_id)
    }
}