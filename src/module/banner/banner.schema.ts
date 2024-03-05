import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class BannerEntity {

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: Boolean, required: false, default: true })
    status: boolean

    @Prop({})
    createdAt: string

    @Prop({})
    updatedAt: string
}

export const BannerSchema = SchemaFactory.createForClass(BannerEntity);