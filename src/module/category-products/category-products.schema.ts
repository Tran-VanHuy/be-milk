import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})

export class CategoryProductsEntity {

    @Prop({require: true})
    name: string

    status: boolean

    createdAt: string

    updatedAt: string
}

export const CategoryProductsTableName = "category-products"
export const CategoryProductsSchema = SchemaFactory.createForClass(CategoryProductsEntity);
export type CategoryProductsDocument = CategoryProductsEntity & Document