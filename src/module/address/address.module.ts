import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AddressEntity, AddressSchema } from "./address.schema";

@Module({

    imports: [MongooseModule.forFeature([{name: AddressEntity.name, schema: AddressSchema}])],
    controllers: [],
    providers: []
})

export class AddressModule {}

