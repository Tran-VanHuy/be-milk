import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BannerEntity, BannerSchema } from "./banner.schema";
import { BannerController } from "./banner.controller";
import { BannerService } from "./banner.service";

@Module({

    imports: [MongooseModule.forFeature([{ name: BannerEntity.name, schema: BannerSchema }])],
    controllers: [BannerController],
    providers: [BannerService]
})

export class BannerModule { }