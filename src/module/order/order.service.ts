import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InfoOrderDto, ListInfoOrderDto } from "./dto/info-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ProductsEntity } from "../products/products.schema";
import { Model } from "mongoose";
import { response } from "src/response/response";
import { ArayItemOrderDto } from "./dto/item-order.dto";
import { ItemOrderEntity, OrderEntity } from "./order.schema";
import { log } from "console";

@Injectable()
export class OrderService {

    constructor(@InjectModel(ProductsEntity.name) private productModel: Model<ProductsEntity>,
        @InjectModel(ItemOrderEntity.name) private itemOrderModel: Model<ItemOrderEntity>,
        @InjectModel(OrderEntity.name) private orderModel: Model<OrderEntity>) { }


    async getAll(userId: string, type: string) {

        try {
            let find = {};

            if (type) {

                find = {
                    ...find,
                    type
                }
            }

            if (userId) {

                find = {
                    ...find,
                    userId
                }
            }
            const res = await this.orderModel.find(find).populate({
                path: "orders",
                model: ItemOrderEntity.name
            }).sort({ createdAt: -1 })
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
            const price = createItemOrder.map(item => item.price);
            const totalPrice = price.reduce((accumulator, value) => accumulator + value, 0)
            const bodyOrder = {
                orders: mapIdItemOrder,
                userId: body.userId,
                type: "ĐÃ ĐẶT HÀNG",
                deliveryAddress: body.deliveryAddress,
                price: totalPrice
            }

            const createOrder = await this.orderModel.create(bodyOrder)
            const res = await this.orderModel.findById(createOrder._id).populate({
                path: "orders",
                model: ItemOrderEntity.name
            })

            return response(200, res)
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
                    quantityProduct: body.quantity,
                    images: product.images[0].name
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
                    nameItem: this.nameItem(body, product),
                    images: body?.msId && product.info.itemMS.find(idMS => idMS._id === body.msId).image
                }
            }
            return response(200, data)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async listInfoOrder(body: ListInfoOrderDto) {

        try {
            const array = [];

            await Promise.resolve(body.products).then(async (values) => {
                for (let i = 0; i < values.length; i++) {
                    const res = await this.productModel.findById(values[i].productId)
                    array.push(res)
                }
            })

            const res = array.map((item, index) => ({
                ...item.toObject(),
                priceDiscount1: this.priceDiscount1(body.products[index], item),
                priceDiscount: this.priceDiscount(body.products[index], item),
                quantityProduct: body.products[index].quantity,
                nameMS: body?.products[index]?.msId && (item.info.itemMS.find(idMS => idMS._id === body.products[index].msId)).name,
                nameSZ: body?.products[index]?.szId && ((item.info.itemMS.find(idMS => idMS._id === body.products[index].msId)).itemSZ.find(idSZ => idSZ._id === body.products[index].szId)).name,
                subtotal: this.subtotal(body.products[index], item),
                price: this.price(body.products[index], item),
                nameItem: this.nameItem(body.products[index], item),
                images: this.imageItem(body.products[index], item)
            }))

            const subtotal = (res.map(item => item.subtotal)).reduce((acc, value) => acc + value, 0)
            const priceDiscount = (res.map(item => item.priceDiscount)).reduce((acc, value) => acc + value, 0)
            const newRes = {
                subtotal,
                priceDiscount,
                orders: res
            }

            return response(200, newRes)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    subtotal(body: InfoOrderDto, product) {

        const itemMS = product?.info?.itemMS?.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return (itemSZ.price - (itemSZ.price * itemSZ.discount / 100)) * (body.quantity || 1)
        }

        if (body?.msId) {
            return ((product.info.itemMS.find(idMS => idMS._id === body.msId)).price - ((product.info.itemMS.find(idMS => idMS._id === body.msId)).price * ((product.info.itemMS.find(idMS => idMS._id === body.msId)).discount / 100))) * body.quantity
        }

        return (product.price - (product.price * (product.discount / 100))) * body.quantity
    }

    price(body: InfoOrderDto, product) {

        const itemMS = product?.info?.itemMS?.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return itemSZ.price
        }

        if (body?.msId) {

            return itemMS.price
        }

        return product.price;
    }

    priceDiscount(body: InfoOrderDto, product) {

        const itemMS = product?.info?.itemMS?.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return (itemSZ.price - (itemSZ.price * (itemSZ.discount / 100))) * body.quantity + (product.transportFee || 0);
        }

        if (body?.msId) {

            return (itemMS.price - (itemMS.price * (itemMS.discount / 100))) * body.quantity + (product.transportFee || 0);
        }

        return (product.price - (product.price * (product.discount / 100))) * body.quantity + (product.transportFee || 0)
    }

    priceDiscount1(body: InfoOrderDto, product) {

        const itemMS = product?.info?.itemMS?.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);


        if (body?.szId) {

            return (itemSZ.price - (itemSZ.price * (itemSZ.discount / 100)))
        }

        if (body?.msId) {

            return (itemMS.price - (itemMS.price * (itemMS.discount / 100)))
        }
        console.log(body?.msId, product?.info?.itemMS);

        return (product.price - (product.price * (product.discount / 100)))
    }

    nameItem(body: InfoOrderDto, product) {

        const itemMS = product?.info?.itemMS?.find(idMS => idMS._id === body.msId);
        const itemSZ = itemMS?.itemSZ?.find(idSZ => idSZ._id === body.szId);

        if (body?.szId) {

            return `${itemMS.name}, ${itemSZ.name}`
        }

        if (body?.msId) {
            return `${itemMS.name}`
        }

        return ``;
    }

    imageItem(body: InfoOrderDto, product) {

        const itemMS = product?.info?.itemMS?.find(idMS => idMS._id === body.msId);

        if (body?.msId) {
            return `${itemMS.image}`
        }

        return product.images[0].name;
    }

    async delete(_id: string, userId: string) {

        try {

            const res = await this.orderModel.findOneAndDelete({ _id, userId })
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}