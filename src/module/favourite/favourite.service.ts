import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FavouriteEntity } from "./favourite.schema";
import { Model } from "mongoose";
import { FavouriteDto } from "./dto/favourite.dto";
import { response } from "src/response/response";
import { ProductsEntity } from "../products/products.schema";
import { checkFavouriteDto } from "./dto/check-favourite.dto";

@Injectable()
export class FavouriteService {

    constructor(@InjectModel(FavouriteEntity.name) private favouriteModel: Model<FavouriteEntity>) { }

    async getAll(skip: number, limit: number, userId: string) {

        try {

            const res = await this.favouriteModel.find({ userId }).skip(skip * limit).limit(limit).populate({
                path: "product",
                model: ProductsEntity.name
            }).sort({ createdAt: -1 })
            const total = (await this.favouriteModel.find({ userId })).length

            return response(200, res, skip, limit, total)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: FavouriteDto) {

        try {

            const res = await this.favouriteModel.create(body);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async checkFavourite(body: checkFavouriteDto) {

        try {

            const res = await this.favouriteModel.findOne({
                userId: body.userId,
                product: body.productId
            })

            let newRes = {};
            if (res) {

                newRes = {
                    status: true
                }

                return response(200, newRes)
            } else {
                newRes = {
                    status: false
                }

                return response(200, newRes)
            }
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}