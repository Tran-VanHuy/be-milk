import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserEntity } from "../user/user.schema";

@Schema({ timestamps: true })
export class NotificationEntity {

    @Prop({ type: String, required: false })
    image: string

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: String, required: true })
    shortContent: string

    @Prop({ type: String, required: false })
    content: string

    @Prop({ type: String, required: false })
    link: string

    @Prop({ type: String, required: false })
    productId: string

    @Prop({ type: Types.ObjectId, required: false, ref: UserEntity.name })
    users: UserEntity[]

    @Prop({ type: String, required: false })
    createdAt: string

    @Prop({ type: String, required: false })
    updatedAt: string
}

@Schema({timestamps: true})
export class NotificationOrderEntity {

    @Prop({ type: String, required: false })
    image: string

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: String, required: true })
    content: string

    @Prop({ type: String, required: false })
    orderId: string

    @Prop({ type: String, required: true })
    orderCode: string

    @Prop({ type: String, required: false })
    userId: string

    @Prop({ type: Boolean, required: false })
    readed: boolean
    
    @Prop({ type: String, required: false })
    createdAt: string

    @Prop({ type: String, required: false })
    updatedAt: string
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationEntity);
export const NotificationOrderSchema = SchemaFactory.createForClass(NotificationOrderEntity);
