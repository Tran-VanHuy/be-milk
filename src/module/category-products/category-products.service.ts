import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CategoryProductsEntity } from "./category-products.schema";
import { Model } from "mongoose";
import { ProductsDto } from "../products/dto/products.dto";
import { response } from "src/response/response";

@Injectable()
export class CategoryProductsService {

    constructor(@InjectModel(CategoryProductsEntity.name) private categoryProductsModule: Model<CategoryProductsEntity>){}

    async create(body: ProductsDto){

        try {
            const res = await this.categoryProductsModule.create(body)
            return response(200, res)
        } catch (error) {
            return response(500, error)
        }
    }
}