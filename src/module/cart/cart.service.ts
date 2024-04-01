import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
                name: product.name,
                quantity: body.quantity
            }
            const res = await this.cartModel.create(newBody)
            return response(200, res)

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)

        }
    }

    async getAll(userId: string, skip: number, limit: number) {

        try {
            const res = await this.cartModel.find({ userId }).populate({
                path: 'product',
                model: ProductsEntity.name
            }).skip(skip * limit).limit(limit).sort({ createdAt: 1 });

            const newData = await Promise.resolve(res).then(async (values) => {

                return values.map((item: any) => ({
                    ...item.toObject(),
                    nameMS: this.nameMS(item),
                    nameSZ: this.nameSZ(item),
                    price: this.valuePrice(item),
                    priceDiscount: this.valuePriceDiscount(item)
                }))

            })

            return response(200, newData)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(_id: string, userId: string) {

        try {

            const res = await this.cartModel.findOneAndDelete({ _id, userId })
            return response(200, res)
        } catch (error) {
            
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async totalCart(userId: string) {

        try {

            const res = (await this.cartModel.find({ userId })).length;
            return response(200, res)
        } catch (error) {

        }
    }

    valuePrice(item: any) {
        if (item?.szId) {

            return ((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId)).itemSZ.find((idSZ: Types.ObjectId) => idSZ._id === item.szId)).price
        }

        if (item?.msId) {
            return (item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId)).price
        }

        return item.product.price
    }

    valuePriceDiscount(item: any) {
        if (item?.szId) {

            return ((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId)).itemSZ.find((idSZ: Types.ObjectId) => idSZ._id === item.szId)).price - (((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId)).itemSZ.find((idSZ: Types.ObjectId) => idSZ._id === item.szId)).price * (((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId)).itemSZ.find((idSZ: Types.ObjectId) => idSZ._id === item.szId)).discount / 100))
        }

        if (item?.msId) {
            return ((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId))).price - ((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId))).price * (((item?.product.info.itemMS.find((idMS: Types.ObjectId) => idMS._id === item.msId)).discount / 100))
        }

        return item.product.price - (item.product.price * (item.product.discount / 100))
    }

    nameMS(item: any) {

        if (item?.msId) {
            return (item?.product?.info?.itemMS?.find((idMS: Types.ObjectId) => idMS._id === item.msId)).name
        }
        return null
    }

    nameSZ(item: any) {

        if (item?.szId) {
            return ((item?.product.info.itemMS.find(idMS => idMS._id === item.msId)).itemSZ.find(idSZ => idSZ._id === item.szId)).name
        }
        return null
    }
}

