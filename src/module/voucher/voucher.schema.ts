import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ProductsEntity } from "../products/products.schema";

@Schema({ timestamps: true })
export class VoucherEntity {

    @Prop({ required: true, type: String, index: true })
    name: string

    @Prop({ required: false, type: String })
    content: string

    @Prop({ required: true, type: Number })
    discount: number

    @Prop({ required: false, type: Number, default: 0 })
    minimum: number

    @Prop({ required: true, type: Types.ObjectId, ref: ProductsEntity.name })
    products: string

    @Prop({ required: false, type: Boolean, default: true })
    status: boolean

    @Prop({ type: String })
    createdAt: string

    @Prop({ type: String })
    updatedAt: string
}

export const VoucherSchema = SchemaFactory.createForClass(VoucherEntity);