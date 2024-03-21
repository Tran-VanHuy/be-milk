import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RatingEntity } from "./rating.schema";
import { Model } from "mongoose";
import { ItemOrderEntity, OrderEntity } from "../order/order.schema";
import { RatingDto } from "./dto/rating.dto";
import { response } from "src/response/response";

@Injectable()
export class RatingService {

    constructor(
        @InjectModel(RatingEntity.name) private ratingModel: Model<RatingEntity>,
        @InjectModel(OrderEntity.name) private orderModel: Model<OrderEntity>,
        @InjectModel(ItemOrderEntity.name) private itemOrderModel: Model<ItemOrderEntity>) { }

    async create(body: RatingDto) {

        try {
            const res = await this.ratingModel.create(body)
            if (res) {
                await this.itemOrderModel.findByIdAndUpdate(body.ItemOrderId, { rating: true, numberRating: body.rating })
            }

            return response(200, res);
        } catch (error) {

            throw error
        }
    }
}