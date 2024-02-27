import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AddressEntity, AddressSchema } from "./address.schema";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { UserEntity, UserSchema } from "../user/user.schema";

@Module({

    imports: [MongooseModule.forFeature([{name: AddressEntity.name, schema: AddressSchema}, , { name: UserEntity.name, schema: UserSchema }])],
    controllers: [AddressController],
    providers: [AddressService, UserEntity]
})

export class AddressModule {}

