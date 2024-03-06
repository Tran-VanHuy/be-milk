import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ProductsEntity } from "../products/products.schema";

@Schema({ timestamps: true })
export class CartEntity {

    @Prop({ required: true, type: String })
    productId: string

    @Prop({ required: true, type: Types.ObjectId, ref: ProductsEntity.name })
    product: string

    @Prop({ required: true, type: String })
    name: string

    @Prop({ required: false, type: String })
    image: string

    @Prop({ required: false, type: String })
    infoId: string

    @Prop({ required: false, type: String })
    msId: string

    @Prop({ required: false, type: String })
    szId: string

    @Prop({ required: false, type: Number })
    type: string

    @Prop({ required: true, type: String })
    userId: string

    @Prop({ required: true, type: Number })
    quantity: number

    @Prop({ required: false })
    createdAt: string

    @Prop({ required: false })
    updatedAt: string
}

export const CartSchema = SchemaFactory.createForClass(CartEntity);