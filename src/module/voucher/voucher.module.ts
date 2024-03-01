import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VoucherEntity, VoucherSchema } from "./voucher.schema";
import { VoucherController } from "./voucher.controller";
import { VoucherService } from "./voucher.service";

@Module({

    imports: [MongooseModule.forFeature([{ name: VoucherEntity.name, schema: VoucherSchema }])],
    controllers: [VoucherController],
    providers: [VoucherService]
})

export class VoucherModule { }