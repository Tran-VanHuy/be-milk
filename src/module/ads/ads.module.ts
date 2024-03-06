import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdsEntity, AdsSchema } from "./ads.schema";
import { AdsController } from "./ads.controller";
import { AdsService } from "./ads.service";

@Module({

    imports: [MongooseModule.forFeature([{ name: AdsEntity.name, schema: AdsSchema }])],
    controllers: [AdsController],
    providers: [AdsService]
})

export class AdsModule { }