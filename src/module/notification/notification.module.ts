import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationEntity, NotificationSchema } from "./notification.schema";
import { NotifiCationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { UserEntity, UserSchema } from "../user/user.schema";

@Module({

    imports: [MongooseModule.forFeature([{ name: NotificationEntity.name, schema: NotificationSchema }, { name: UserEntity.name, schema: UserSchema }])],
    controllers: [NotifiCationController],
    providers: [NotificationService, UserEntity]
})

export class NotificationModule { }