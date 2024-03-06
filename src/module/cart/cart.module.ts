import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartEntity, CartSchema } from "./cart.schema";
import { ProductsEntity, ProductsSchema } from "../products/products.schema";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({

    imports: [MongooseModule.forFeature([{ name: CartEntity.name, schema: CartSchema }, { name: ProductsEntity.name, schema: ProductsSchema }])],
    controllers: [CartController],
    providers: [CartService, ProductsEntity]
})

export class CartModule { }