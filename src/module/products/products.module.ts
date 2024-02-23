import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsEntity, ProductsSchema } from "./products.schema";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [MongooseModule.forFeature([{name: ProductsEntity.name, schema: ProductsSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService]
})

export class ProductsModule {}