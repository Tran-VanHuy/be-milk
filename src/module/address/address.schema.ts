import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class AddressEntity{
  

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

    @Prop({type: String, required: false})
    userId: string

}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity);
