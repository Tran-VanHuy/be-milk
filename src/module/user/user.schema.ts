import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
}

export const UserTableName = "users";
export const UserSchema = SchemaFactory.createForClass(UserEntity);
export type UserDocument = UserEntity & Document;