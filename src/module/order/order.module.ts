import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductsEntity, ProductsSchema } from "../products/products.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "../user/user.schema";

@Module({

    imports: [MongooseModule.forFeature([{ name: ProductsEntity.name, schema: ProductsSchema }])],
    controllers: [OrderController],
    providers: [OrderService, ProductsEntity]
})

export class OrderModule { }