import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class OrderEntity {

    @Prop({
        type: String, default: function genUUID() {
            return uuidv4()
        }
    })
    orderCode: string

    @Prop({ type: Types.ObjectId, required: true })
    orders: ItemOrderEntity[]

    @Prop({ type: String, required: true })
    userId: string

    @Prop({ type: String, required: true })
    type: string

    @Prop({ type: String, required: true })
    deliveryAddress: string

    @Prop({ type: Object, required: true })
    address: object

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: String, required: false })
    createdAt: string

    @Prop({ type: String, required: false })
    updatedAd: string
}

@Schema({ timestamps: true })
export class ItemOrderEntity {

    @Prop({ type: String, required: true })
    productId: string

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: Number, required: true })
    quantity: number

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: String, required: true })
    address: string

    @Prop({ type: String, required: true })
    userId: string

    @Prop({ type: String, required: false })
    nameItem: string

    @Prop({ type: String, required: false })
    images: string

    @Prop({ type: String, required: false })
    msId: string

    @Prop({ type: String, required: false })
    szId: string

    @Prop({ type: Boolean, required: false, default: false })
    rating: boolean

    @Prop({ type: Number, required: false, default: 0 })
    numberRating: number

    @Prop({ type: String, required: false })
    createdAt: string

    @Prop({ type: String, required: false })
    updatedAd: string
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
export const ItemOrderSchema = SchemaFactory.createForClass(ItemOrderEntity);
