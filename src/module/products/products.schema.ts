import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { CategoryProductsEntity } from "../category-products/category-products.schema";
import { v4 as uuidv4 } from 'uuid';
export class ListImage extends Document {
    uid: string
    name: string
}

@Schema()
export class ItemSZ extends Document {
    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    _id: string

    @Prop({required: false, type: String})
    name: string

    @Prop({required: false, type: String})
    image: string

    @Prop({required: false, type: Number})
    price: number

    @Prop({required: false, type: Number})
    discount: number

    @Prop({required: false, type: Number})
    quantity: number
}

@Schema()
export class ItemMS extends Document {
    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    _id: string

    @Prop({required: false, type: String})
    name: string

    @Prop({required: false, type: String})
    image: string

    @Prop({required: false, type: [ItemSZ], ref: ItemSZ.name})
    itemSZ: Array<ItemSZ>

    @Prop({required: false, type: Number})
    price: number

    @Prop({required: false, type: Number})
    discount: number

    @Prop({required: false, type: Number})
    quantity: number
}

@Schema()
export class InfoProducts extends Document {
    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    _id: string

    @Prop({required: true})
    ms: string
    
    @Prop({type: [ItemMS], ref: ItemMS.name})
    itemMS: Array<ItemMS>

}

@Schema({timestamps: true})
export class ProductsEntity {
 
    @Prop({required: true, type: [ListImage], _id: true})
    images: [ListImage]

    @Prop({required: true})
    name: string

    @Prop({})
    sale: number

    @Prop({required: false, type: Number, default: 0})
    price: number

    @Prop({required: false, type: Number, default: 0})
    discount: number

    @Prop({required: false, type: Number, default: 0})
    quantity: number

    @Prop({required: false, type: Number, default: 0})
    point: number

    @Prop({required: false, type: String})
    content: string

    @Prop({type: InfoProducts})
    info: InfoProducts

    @Prop({type: Types.ObjectId, ref: CategoryProductsEntity.name})
    categories: CategoryProductsEntity[]

    @Prop({type: Boolean, default: true})
    status: boolean

    @Prop({})
    createdAt: string

    @Prop({})
    updatedAt: string
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsEntity);
export const InfoProductSchema = SchemaFactory.createForClass(InfoProducts);
export const ItemMSSchema = SchemaFactory.createForClass(ItemMS);
export const ItemSZSchema = SchemaFactory.createForClass(ItemSZ);
export type ProductsDocument = ProductsEntity & Document;