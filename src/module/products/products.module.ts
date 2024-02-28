import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { InfoProductSchema, InfoProducts, ItemMS, ItemMSSchema, ItemSZ, ItemSZSchema, ProductsEntity, ProductsSchema } from "./products.schema";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name: ProductsEntity.name, schema: ProductsSchema}, 
            {name: InfoProducts.name, schema: InfoProductSchema},
            {name: ItemMS.name, schema: ItemMSSchema},
            {name: ItemSZ.name, schema: ItemSZSchema}
        ])],
    controllers: [ProductsController],
    providers: [ProductsService]
})

export class ProductsModule {}