import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AddressEntity } from "../address/address.schema";
import mongoose, { Document, Types } from "mongoose";


@Schema()
export class UserEntity {

    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    avatar: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    phone: string;

    @Prop({ type: [{ type: AddressEntity, ref: AddressEntity.name }] })
    address:  AddressEntity[]
}

export const UserTableName = "users";
export const UserSchema = SchemaFactory.createForClass(UserEntity);
export type UserDocument = UserEntity & Document;