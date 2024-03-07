import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AdsEntity } from "./ads.schema";
import { Model } from "mongoose";
import { AdsDto } from "./dto/ads.dto";
import { response } from "src/response/response";

@Injectable()
export class AdsService {

    constructor(@InjectModel(AdsEntity.name) private adsModule: Model<AdsEntity>) { }

    async getAll(skip: number, limit: number, status: boolean) {

        try {
            let find = {};

            if (status) {
                find = {
                    ...find,
                    status
                }
            }

            const res = await this.adsModule.find(find).skip(skip * limit).limit(limit).sort({ createdAt: -1 });
            const total = (await this.adsModule.find()).length

            return response(200, res, skip, limit, total)
        } catch (error) {

        }
    }

    async create(body: AdsDto) {

        try {

            const res = await this.adsModule.create(body)
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async detail(_id: string) {

        try {

            const res = await this.adsModule.findById(_id)
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async update(_id: string, body: AdsDto) {
        try {

            const res = await this.adsModule.findByIdAndUpdate(_id, body)
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(_id: string) {

        try {

            const res = await this.adsModule.findByIdAndDelete(_id)
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

}