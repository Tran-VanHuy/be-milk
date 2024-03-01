import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { VoucherEntity } from "./voucher.schema";
import { Model } from "mongoose";
import { response } from "src/response/response";
import { VoucherDto } from "./dto/voucher.dto";

@Injectable()
export class VoucherService {

    constructor(@InjectModel(VoucherEntity.name) private voucherModel: Model<VoucherEntity>) { }

    async getAll(product: string, status: boolean) {

        try {

            let find = {};
            if (product) {

                find = {
                    ...find,
                    products: { $in: [product] }
                }
            }
            if (status) {

                find = {

                    ...find,
                    status: status
                }
            }
            const res = await this.voucherModel.find(find).sort({ createdAt: -1 });
            return response(200, res);
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: VoucherDto) {

        try {

            const res = await this.voucherModel.create(body);
            return res;
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(_id: string) {

        try {

            const res = await this.voucherModel.findByIdAndDelete(_id);
            return res;
        } catch (error) {
            
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}