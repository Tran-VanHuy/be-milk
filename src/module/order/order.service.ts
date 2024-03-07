import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InfoOrderDto } from "./dto/info-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ProductsEntity } from "../products/products.schema";
import { Model } from "mongoose";
import { response } from "src/response/response";
import { ArayItemOrderDto } from "./dto/item-order.dto";
import { ItemOrderEntity, OrderEntity } from "./order.schema";

@Injectable()
export class OrderService {

    constructor(@InjectModel(ProductsEntity.name) private productModel: Model<ProductsEntity>,
        @InjectModel(ItemOrderEntity.name) private itemOrderModel: Model<ItemOrderEntity>,
        @InjectModel(OrderEntity.name) private orderModel: Model<OrderEntity>) { }


    async getAll() {

        try {

            const res = await this.orderModel.find().populate({
                path: "orders",
                model: ItemOrderEntity.name
            })
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: ArayItemOrderDto) {

        try {

            const createItemOrder = await Promise.resolve(body.order).then(async (values) => {

                const create = await this.itemOrderModel.create(values)
                return create
            })

            const mapIdItemOrder = createItemOrder.map(item => item._id.toString())
            const bodyOrder = {
                orders: mapIdItemOrder,
                userId: body.userId,
                type: "ĐÃ ĐẶT HÀNG"
            }

            const createOrder = await this.orderModel.create(bodyOrder)

            return response(200, createOrder)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async infoOrder(body: InfoOrderDto) {

        try {
            const product = await this.productModel.findById({ _id: body.productId })
            let data = {};
            if (body.type === 3) {

                data = {
                    ...product.toObject(),
                    priceDiscount1: (product.price - (product.price * (product.discount / 100))),
                    priceDiscount: (product.price - (product.price * (product.discount / 100))) * body.quantity + (product?.transportFee || 0),
                    subtotal: (product.price - (product.price * (product.discount / 100))) * body.quantity,
                    quantityProduct: body.quantity
                }
            } else {
                data = {
                    ...product.toObject(),
                    priceDiscount1: this.priceDiscount1(body, product),
                    priceDiscount: this.priceDiscount(body, product),
                    quantityProduct: body.quantity,
                    nameMS: body?.msId && (product.info.itemMS.find(idMS => idMS._id === body.msId)).name,
                    nameSZ: body?.szId && ((product.info.itemMS.find(idMS => idMS._id === body.msId)).itemSZ.find(idSZ => idSZ._id === body.szId)).name,
                    subtotal: this.subtotal(body, product),
                    price: this.price(body, product),
                    nameItem: this.nameItem(body, product)
                }
            }
            return response(200, data)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    subtotal(body: InfoOrderDto, product) {

        const itemMS = product.info.itemMS.find(idMS => idMS._id === body.msId);
        if (body?.szId) {
            return ((itemMS.itemSZ.find(idSZ => idSZ._id === body.szId)).price - ((itemMS.itemSZ.find(idSZ => idSZ._id === body.szId)).price * ((itemMS.itemSZ.find(idSZ => idSZ._id === body.szId)).discount / 100))) * body.quantity;

        }

        if (body?.msId) {
            return ((product.info.itemMS.find(idMS => idMS._id === body.msId)).price - ((product.info.itemMS.find(idMS => idMS._id === body.msId)).price * ((product.info.itemMS.find(idMS => idMS._id === body.msId)).discount / 100))) * body.quantity
        }
    }

    price(body: InfoOrderDto, product) {

        const itemMS = product.info.itemMS.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return itemSZ.price
        }

        if (body?.msId) {

            return itemMS.price
        }
    }

    priceDiscount(body: InfoOrderDto, product) {

        const itemMS = product.info.itemMS.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return (itemSZ.price - (itemSZ.price * (itemSZ.discount / 100))) * body.quantity + (product.transportFee || 0);
        }

        if (body?.msId) {

            return (itemMS.price - (itemMS.price * (itemMS.discount / 100))) * body.quantity + (product.transportFee || 0);
        }
    }

    priceDiscount1(body: InfoOrderDto, product) {

        const itemMS = product.info.itemMS.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return (itemSZ.price - (itemSZ.price * (itemSZ.discount / 100)))
        }

        if (body?.msId) {

            return (itemMS.price - (itemMS.price * (itemMS.discount / 100)))
        }
    }

    nameItem(body: InfoOrderDto, product) {

        const itemMS = product.info.itemMS.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return `${itemMS.name}, ${itemSZ.name}`
        }

        if (body?.msId) {
            return `${itemMS.name}`
        }
    }
}