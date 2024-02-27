import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({

    imports: [MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}