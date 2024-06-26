import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InfoOrderDto, ListInfoOrderDto } from "./dto/info-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ProductsEntity } from "../products/products.schema";
import { Model } from "mongoose";
import { response } from "src/response/response";
import { ArayItemOrderDto } from "./dto/item-order.dto";
import { ItemOrderEntity, OrderEntity } from "./order.schema";
import { ChangeStatusDto } from "./dto/change-status.dto";
import { UserEntity } from "../user/user.schema";
import { AddressEntity } from "../address/address.schema";
import { Observable, from, map, reduce } from "rxjs";
import { NotificationOrderEntity } from "../notification/notification.schema";
import { NotificationOrderDto } from "../notification/dto/notification-order.dto";
import { formatPrice } from "src/common/format-price";
import { log } from "console";

@Injectable()
export class OrderService {

    constructor(@InjectModel(ProductsEntity.name) private productModel: Model<ProductsEntity>,
        @InjectModel(ItemOrderEntity.name) private itemOrderModel: Model<ItemOrderEntity>,
        @InjectModel(OrderEntity.name) private orderModel: Model<OrderEntity>,
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
        @InjectModel(AddressEntity.name) private addressModel: Model<AddressEntity>,
        @InjectModel(NotificationOrderEntity.name) private notificationOrderModel: Model<NotificationOrderEntity>) { }


    async getAll(skip: number, limit: number, userId: string, type: string) {

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
            }).skip(skip * limit).limit(limit).sort({ updatedAt: -1 })
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: ArayItemOrderDto) {

        try {

            const addressUser = await this.addressModel.findOne({ userId: body.userId, default: true })
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
                price: totalPrice,
                address: addressUser
            }

            const createOrder = await this.orderModel.create(bodyOrder)
            const res = await this.orderModel.findById(createOrder._id).populate({
                path: "orders",
                model: ItemOrderEntity.name
            })
            if (res) {

                const bodyNotificationUserOrder: NotificationOrderDto = {
                    image: "https://theme.hstatic.net/1000360022/1001204220/14/policies_icon_2.png?v=1623",
                    title: `Bạn vừa đặt đơn hàng đang chờ xác nhận...!`,
                    content: `Đơn hàng trị giá ${formatPrice(totalPrice)} đang chờ cần xác nhận!`,
                    orderId: res._id.toString(),
                    orderCode: res.orderCode,
                    userId: res.userId,
                    readed: false
                }

                const bodyNotificationAdminOrder: NotificationOrderDto = {
                    image: "https://theme.hstatic.net/1000360022/1001204220/14/policies_icon_2.png?v=1623",
                    title: `Xác nhận đơn hàng`,
                    content: `Đơn hàng trị giá ${formatPrice(totalPrice)} chưa xác nhận!`,
                    orderId: res._id.toString(),
                    orderCode: res.orderCode,
                    userId: "ADMIN",
                    readed: false
                }

                await this.userModel.findOneAndUpdate({ userId: res.userId }, { notification: true })
                await this.notificationOrderModel.create(bodyNotificationUserOrder)
                await this.notificationOrderModel.create(bodyNotificationAdminOrder)

                const findUserAdmin = await this.userModel.find({ role: "ADMIN" })
                await Promise.all(findUserAdmin).then(values => {

                    values.map(async (item) => {

                        await this.userModel.findByIdAndUpdate(item._id, { notification: true })
                    })
                })
            }

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
                images: this.imageItem(body.products[index], item),
                msId: body?.products[index]?.msId,
                szId: body?.products[index]?.szId
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

    async changeStatus(body: ChangeStatusDto) {

        try {
            const findUser = await this.userModel.findOne({ userId: body.userId }).select({ role: 1 });
            if (findUser?.role === "ADMIN") {
                let res: any = {};
                if (body.type === "Hủy đơn hàng") {

                    res = await this.orderModel.findByIdAndDelete(body.orderId);

                    const bodyNotificationUserOrder: NotificationOrderDto = {
                        image: "https://theme.hstatic.net/1000360022/1001204220/14/policies_icon_2.png?v=1623",
                        title: `Đơn hàng đã bị hủy...!`,
                        content: `Đơn hàng trị giá ${formatPrice(res.price)} đã bị hủy!`,
                        orderId: res._id.toString(),
                        orderCode: res.orderCode,
                        userId: res.userId,
                        readed: true
                    }
                    await this.notificationOrderModel.create(bodyNotificationUserOrder)
                }

                if (body.type === "Đang vận chuyển") {

                    res = await this.orderModel.findByIdAndUpdate(body.orderId, { type: "ĐANG VẬN CHUYỂN" });

                    const bodyNotificationUserOrder: NotificationOrderDto = {
                        image: "https://theme.hstatic.net/1000360022/1001204220/14/policies_icon_2.png?v=1623",
                        title: `Đơn hàng của bạn đang được vận chuyển...!`,
                        content: `Đơn hàng trị giá ${formatPrice(res.price)} đang được vận chuyển!`,
                        orderId: res._id.toString(),
                        orderCode: res.orderCode,
                        userId: res.userId,
                        readed: true
                    }
                    await this.notificationOrderModel.create(bodyNotificationUserOrder)
                }

                if (body.type === "Đã vận chuyển") {
                    res = await this.orderModel.findByIdAndUpdate(body.orderId, { type: "ĐÃ VẬN CHUYỂN" });

                    const bodyNotificationUserOrder: NotificationOrderDto = {
                        image: "https://theme.hstatic.net/1000360022/1001204220/14/policies_icon_2.png?v=1623",
                        title: `Giao hàng thành công`,
                        content: `Đơn hàng trị giá ${formatPrice(res.price)} đã giao thành công!`,
                        orderId: res._id.toString(),
                        orderCode: res.orderCode,
                        userId: res.userId,
                        readed: true
                    }
                    await this.notificationOrderModel.create(bodyNotificationUserOrder)
                }

                await this.userModel.findOneAndUpdate({ userId: res.userId }, { notification: true })
                const findUserAdmin = await this.userModel.find({ role: "ADMIN" })
                await Promise.all(findUserAdmin).then(values => {

                    values.map(async (item) => {

                        await this.userModel.findByIdAndUpdate(item._id, { notification: true })
                    })
                })
                return response(200, res)
            } else {
                throw new HttpException(null, HttpStatus.FORBIDDEN)
            }

        } catch (error) {
            return error
        }
    }

    async orderDetail(_id: string) {

        try {

            const res = await this.orderModel.findById(_id);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async quantityTypeOrder(userId: string) {

        try {
            let find = {}

            const findUser = await this.userModel.findOne({ userId: userId });

            if (findUser.role === "USER") {

                find = {
                    ...find,
                    userId
                }
            }
            const res = await this.orderModel.find(find).populate({
                path: "orders",
                model: ItemOrderEntity.name
            })
            const ordered = res.filter(item => item.type === "ĐÃ ĐẶT HÀNG").length
            const beingTransported = res.filter(item => item.type === "ĐANG VẬN CHUYỂN").length

            const shipped = res.filter(item => item.type === "ĐÃ VẬN CHUYỂN")
            const countShipped = await Promise.all(shipped).then(values => {

                const rating = values.map(item => item.orders).flat()
                const filter = rating.filter(item => item.rating !== true).length

                return filter;
            })

            const newRes = {
                ordered,
                beingTransported,
                shipped: countShipped
            }

            return response(200, newRes)

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async bought(userId: string) {

        try {

            let find = {};
            const findUser = await this.userModel.findOne({ userId });
            if (findUser.role !== "ADMIN") {
                find = {

                    ...find,
                    userId
                }
            }
            const res = await this.itemOrderModel.find(find).populate({
                path: "productId",
                model: ProductsEntity.name
            });



            if (res && res.length > 0) {
                const statistical = this.calculateProductCount(res)

                return statistical
            }

            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    // Function to calculate the count of each productId
    calculateProductCount(data: any[]): Observable<any[]> {
        // Convert the array to an observable
        return from(data).pipe(
            // Use the map operator to extract productId and name from each object
            map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                images: item.productId.images[0].name
            })),
            // Use the reduce operator to count occurrences of each productId
            reduce((acc, { productId, name, images }) => {
                if (!acc[productId]) {
                    acc[productId] = { count: 0, name, images };
                }
                acc[productId].count++;
                return acc;
            }, {}),
            // Convert the result to an array of objects
            map((counts) => {
                return Object.keys(counts).map((productId) => ({
                    productId,
                    name: counts[productId].name,
                    images: counts[productId].images,
                    count: counts[productId].count,
                }));
            }),
        );
    }

    async ratingAndSale(productId: string) {

        try {

            const res = await this.itemOrderModel.find({ productId: productId });

            const rated = res.filter(item => item.rating !== false)

            const numberRating = rated.map(item => item.numberRating);
            const totalRating = numberRating.reduce((acc, val) => acc + val, 0);
            const mediumRating = Math.round(totalRating / numberRating.length)

            const newRes = {

                sale: res.length,
                totalRating,
                mediumRating
            }

            return response(200, newRes)
        } catch (error) {

        }
    }

}