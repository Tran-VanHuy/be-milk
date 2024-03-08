import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ProductsEntity } from "../products/products.schema";

@Schema({ timestamps: true })
export class FavouriteEntity {

    @Prop({ type: String, required: true })
    userId: string

    @Prop({ type: Types.ObjectId, required: true, ref: ProductsEntity.name })
    product: ProductsEntity[]

    @Prop({ required: false })
    createdAt: string

    @Prop({ required: false })
    updatedAt: string
}

export const FavouriteSchema = SchemaFactory.createForClass(FavouriteEntity);