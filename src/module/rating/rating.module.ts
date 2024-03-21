import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RatingEntity, RatingSchema } from "./rating.schema";
import { RatingService } from "./rating.service";
import { ItemOrderEntity, ItemOrderSchema, OrderEntity, OrderSchema } from "../order/order.schema";
import { RatingController } from "./rating.controller";
import { ItemOrderDto } from "../order/dto/item-order.dto";

@Module({

    imports: [MongooseModule.forFeature(
        [
            { name: RatingEntity.name, schema: RatingSchema },
            { name: OrderEntity.name, schema: OrderSchema },
            { name: ItemOrderEntity.name, schema: ItemOrderSchema }
        ],
    )],
    controllers: [RatingController],
    providers: [RatingService, OrderEntity, ItemOrderEntity]
})

export class RatingModule { }