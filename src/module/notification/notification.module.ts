import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationEntity, NotificationSchema } from "./notification.schema";
import { NotifiCationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({

    imports: [MongooseModule.forFeature([{ name: NotificationEntity.name, schema: NotificationSchema }])],
    controllers: [NotifiCationController],
    providers: [NotificationService]
})

export class NotificationModule { }