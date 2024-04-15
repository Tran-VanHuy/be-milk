import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RatingEntity } from "./rating.schema";
import { Model } from "mongoose";
import { ItemOrderEntity, OrderEntity } from "../order/order.schema";
import { RatingDto } from "./dto/rating.dto";
import { response, responseRating } from "src/response/response";
import { log } from "console";
import { ReplyRatingDto } from "./dto/reply.dto";

@Injectable()
export class RatingService {

    constructor(
        @InjectModel(RatingEntity.name) private ratingModel: Model<RatingEntity>,
        @InjectModel(ItemOrderEntity.name) private itemOrderModel: Model<ItemOrderEntity>) { }


    async getAll(skip: number, limit: number, productId: string) {

        try {

            const res = await this.ratingModel.find({ productId }).skip(skip * limit).limit(limit).sort({ createdAt: -1 });
            const total = await this.ratingModel.find({ productId });

            const rating = total && total.length > 0 ? total.map(item => item?.rating) : [1]
            const reduceRating = rating.reduce((acc, val) => acc + val);
            const mediumRating = reduceRating / rating.length;

            return responseRating(200, res, skip, limit, total.length, mediumRating)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)

        }
    }

    async create(body: RatingDto) {

        try {
            const res = await this.ratingModel.create(body)
            if (res) {
                await this.itemOrderModel.findByIdAndUpdate(body.ItemOrderId, { rating: true, numberRating: body.rating, reply: null })
            }

            return response(200, res);
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async reply(body: ReplyRatingDto) {

        try {

            const res = await this.ratingModel.findByIdAndUpdate(body.id, { reply: body.reply })
            const find = await this.ratingModel.findById(res._id);
            return response(200, find);
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}