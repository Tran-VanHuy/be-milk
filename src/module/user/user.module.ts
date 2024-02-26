import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AddressEntity, AddressSchema } from "../address/address.schema";

@Module({

    imports: [MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}, {name: AddressEntity.name, schema: AddressSchema}])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}