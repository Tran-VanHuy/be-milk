import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CategoryProductsEntity } from "./category-products.schema";
import { Model } from "mongoose";
import { ProductsDto } from "../products/dto/products.dto";
import { response } from "src/response/response";
import { CategoryProductDto } from "./dto/category-product.dto";

@Injectable()
export class CategoryProductsService {

    constructor(@InjectModel(CategoryProductsEntity.name) private categoryProductsModule: Model<CategoryProductsEntity>) { }

    async getAll() {

        try {
            const res = await this.categoryProductsModule.find();
            if (res) {

                return response(200, res)
            } else {

                throw new HttpException("Không thành công", HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: CategoryProductDto) {

        try {
            const res = await this.categoryProductsModule.create(body)
            return response(200, res)
        } catch (error) {
            return response(500, error)
        }
    }
}