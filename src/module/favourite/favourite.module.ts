import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FavouriteEntity, FavouriteSchema } from "./favourite.schema";
import { FavouriteController } from "./favourite.controller";
import { FavouriteService } from "./favourite.service";

@Module({

    imports: [MongooseModule.forFeature([{ name: FavouriteEntity.name, schema: FavouriteSchema }])],
    controllers: [FavouriteController],
    providers: [FavouriteService]
})

export class FavouriteModel { }