import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CartEntity } from "./cart.schema";
import { Model, Types } from "mongoose";
import { CartDto } from "./dto/cart.dto";
import { ProductsEntity } from "../products/products.schema";
import { response } from "src/response/response";

@Injectable()

export class CartService {

    constructor(@InjectModel(CartEntity.name) private cartModel: Model<CartEntity>,
        @InjectModel(ProductsEntity.name) private productModel: Model<ProductsEntity>) { }

    async create(body: CartDto) {

        try {

            const product = await this.productModel.findOne({ _id: body.productId })
            const newBody = {
                ...body,
                name: product.name
            }
            const res = await this.cartModel.create(newBody)
            return response(200, res)

        } catch (error) {
            console.log({ error });

        }
    }

    async getAll(userId: string) {

        try {
            const res = await this.cartModel.find({ userId }).populate({
                path: 'product',
                model: ProductsEntity.name
            });

            const newData = await Promise.resolve(res).then(async (values) => {

               return await values.map((item: any) => ({
                    ...item.toObject(),
                    nameMS: (item?.product?.info?.itemMS?.find((idMS: Types.ObjectId) => idMS._id === item.msId)).name,
                    nameSZ: ((item?.product.info.itemMS.find(idMS => idMS._id === item.msId)).itemSZ.find(idSZ => idSZ._id === item.szId)).name,
                    price:  ((item?.product.info.itemMS.find(idMS => idMS._id === item.msId)).itemSZ.find(idSZ => idSZ._id === item.szId)).price,
                    priceDiscount: ((item?.product.info.itemMS.find(idMS => idMS._id === item.msId)).itemSZ.find(idSZ => idSZ._id === item.szId)).price - (((item?.product.info.itemMS.find(idMS => idMS._id === item.msId)).itemSZ.find(idSZ => idSZ._id === item.szId)).price * (((item?.product.info.itemMS.find(idMS => idMS._id === item.msId)).itemSZ.find(idSZ => idSZ._id === item.szId)).discount / 100))
                }))

            })
            
            return response(200, newData)
        } catch (error) {

        }
    }
}