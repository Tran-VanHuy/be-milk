import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class NotificationEntity {

    @Prop({ type: String, required: false })
    image: string

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: String, required: true })
    shortContent: string

    @Prop({ type: String, required: true })
    content: string

    @Prop({ type: String, required: false })
    link: string

    @Prop({ type: String, required: false })
    productId: string

    @Prop({ type: String, required: false })
    createdAt: string

    @Prop({ type: String, required: false })
    updatedAt: string
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationEntity);