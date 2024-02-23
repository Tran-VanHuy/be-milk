import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryProductsEntity, CategoryProductsSchema } from "./category-products.schema";
import { CategoryProductsController } from "./category-products.controller";
import { CategoryProductsService } from "./category-products.service";

@Module({

    imports: [MongooseModule.forFeature([{name: CategoryProductsEntity.name, schema: CategoryProductsSchema}])],
    controllers: [CategoryProductsController],
    providers: [CategoryProductsService]
})

export class CategoryProductsModule {}