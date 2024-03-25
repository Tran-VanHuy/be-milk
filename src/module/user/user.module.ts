import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../../auth/constants";

@Module({

    imports: [MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema},]), JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        // signOptions: { expiresIn: '60s' },
      }),],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}