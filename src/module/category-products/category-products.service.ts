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

    async getAll(skip: number, limit: number, status: boolean) {

        try {
            const res = await this.categoryProductsModule.find().skip(skip * limit).limit(limit).sort({ createdAt: -1 });
            const total = await this.categoryProductsModule.find();

            if (res) {

                return response(200, res, skip, limit, total.length)
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

    async detail(_id: string) {

        try {

            const res = await this.categoryProductsModule.findById(_id);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async update(_id: string, body: CategoryProductDto) {

        try {

            const res = await this.categoryProductsModule.findByIdAndUpdate(_id, body);
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(_id: string) {

        try {

            const res = await this.categoryProductsModule.findByIdAndDelete(_id);
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}