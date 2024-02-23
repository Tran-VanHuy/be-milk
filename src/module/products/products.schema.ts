import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CategoryProductsEntity } from "../category-products/category-products.schema";

class ListImage extends Document {
    name: string
}

class ItemSZ extends Document {

    name: string
    image: string
    price: number
    discount: number
}

class ItemMS extends Document {

    name: string
    image: string
    itemSZ: Array<ItemSZ>
}

class InfoProducts extends Document {

    ms: string
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

    @Prop({})
    point: number

    @Prop({})
    content: string

    @Prop({type: [InfoProducts]})
    info: [InfoProducts]

    @Prop({ref: CategoryProductsEntity.name})
    categories: [CategoryProductsEntity]

    @Prop({})
    createdAt: string

    @Prop({})
    updatedAt: string
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsEntity);
export type ProductsDocument = ProductsEntity & Document;