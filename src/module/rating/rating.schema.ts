import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class RatingEntity {

    @Prop({ type: [], required: false })
    media: Media[]

    @Prop({ type: String, required: true })
    productId: string

    @Prop({ type: String, required: true })
    nameProduct: string

    @Prop({ type: String, required: false })
    itemNameProduct: string

    @Prop({ type: String, required: true })
    userId: string

    @Prop({ type: String, required: false })
    nameUser: string

    @Prop({ type: String, required: true })
    content: string

    @Prop({ type: Number, required: true })
    rating: number

    @Prop({ type: String, required: false })
    reply: string
}

export class Media {

    @Prop({ type: String, required: false })
    name: string

    @Prop({ type: String, required: false })
    type: string
}

export const RatingSchema = SchemaFactory.createForClass(RatingEntity)