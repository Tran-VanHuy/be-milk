import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductsEntity, ProductsSchema } from "../products/products.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "../user/user.schema";
import { ItemOrderEntity, ItemOrderSchema, OrderEntity, OrderSchema } from "./order.schema";
import { AddressEntity, AddressSchema } from "../address/address.schema";
import { NotificationOrderEntity, NotificationOrderSchema } from "../notification/notification.schema";

@Module({

    imports: [MongooseModule.forFeature([
        { name: ProductsEntity.name, schema: ProductsSchema },
        { name: OrderEntity.name, schema: OrderSchema },
        { name: ItemOrderEntity.name, schema: ItemOrderSchema },
        { name: UserEntity.name, schema: UserSchema },
        { name: AddressEntity.name, schema: AddressSchema },
        { name: NotificationOrderEntity.name, schema: NotificationOrderSchema }

    ])],
    controllers: [OrderController],
    providers: [OrderService, ProductsEntity, UserEntity, AddressEntity, NotificationOrderEntity]
})

export class OrderModule { }