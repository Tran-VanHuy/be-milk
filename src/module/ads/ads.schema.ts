import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class AdsEntity {

    @Prop({ required: true, type: String })
    name: string

    @Prop({ required: false, default: true, type: Boolean })
    status: boolean

    @Prop({})
    createdAt: string

    @Prop({})
    updatedAt: string
}

export const AdsSchema = SchemaFactory.createForClass(AdsEntity);