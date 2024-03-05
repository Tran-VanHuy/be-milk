import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })

export class CategoryProductsEntity {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    image: string

    @Prop({ required: false, default: true })
    status: boolean

    @Prop({ required: false })
    createdAt: string

    @Prop({ required: false })
    updatedAt: string
}

export const CategoryProductsTableName = "category-products"
export const CategoryProductsSchema = SchemaFactory.createForClass(CategoryProductsEntity);
export type CategoryProductsDocument = CategoryProductsEntity & Document