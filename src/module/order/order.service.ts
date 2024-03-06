import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InfoOrderDto } from "./dto/info-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ProductsEntity } from "../products/products.schema";
import { Model } from "mongoose";
import { response } from "src/response/response";

@Injectable()
export class OrderService {

    constructor(@InjectModel(ProductsEntity.name) private productModel: Model<ProductsEntity>) { }

    async infoOrder(body: InfoOrderDto) {

        try {
            const product = await this.productModel.findById({ _id: body.productId })
            let data = {};
            if (body.type === 3) {

                data = {
                    ...product.toObject(),
                    priceDiscount1: (product.price - (product.price * (product.discount / 100))) * body.quantity + (product?.transportFee || 0),
                    priceDiscount: (product.price - (product.price * (product.discount / 100))) * body.quantity + (product?.transportFee || 0),
                    subtotal: (product.price - (product.price * (product.discount / 100))) * body.quantity,
                    quantityProduct: body.quantity
                }
            }
            return response(200, data)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}