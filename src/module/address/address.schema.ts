import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({_id: true})
export class AddressEntity{
    @Prop({type: Types.ObjectId})
    _id: Types.ObjectId;

    @Prop({required: true, type: String})
    name: string;

    @Prop({required: true, type: String})
    phone: string;

    @Prop({required: true, type: String})
    city: string

    @Prop({required: true, type: String})
    district: string

    @Prop({required: true, type: String})
    commune: string

    @Prop({required: true, type: String})
    specificAddress: string

    @Prop({type:Boolean, required: false, default: false})
    default: boolean
}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity);
