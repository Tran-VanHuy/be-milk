import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductsDocument, ProductsEntity } from "./products.schema";
import { Model } from "mongoose";
import { ProductsDto } from "./dto/products.dto";
import { response } from "src/response/response";
import { log } from "console";
import { CategoryProductsEntity } from "../category-products/category-products.schema";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(ProductsEntity.name) private readonly productModel: Model<ProductsDocument>) { }

    async getAll(skip: number, limit: number, status: boolean) {

        try {
            let find = {};
            if (status) {

                find = { status: status }
            }
            const res = await this.productModel.find(find).populate({
                path: 'categories',
                model: CategoryProductsEntity.name
            }).skip(skip * limit).limit(limit || 10).sort({ createdAt: -1 })
            const total = (await this.productModel.find()).length
            return response(200, res, skip, limit, total)
        } catch (error) {

            return response(500, error)
        }
    }

    async create(body: ProductsDto) {

        try {

            const res = await this.productModel.create(body);
            return response(200, res)
        } catch (error) {

            return response(500, error)
        }
    }
}