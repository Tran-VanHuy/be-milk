import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BannerEntity } from "./banner.schema";
import { Model } from "mongoose";
import { BannerDto } from "./dto/banner.dto";
import { response } from "src/response/response";

@Injectable()
export class BannerService {

    constructor(@InjectModel(BannerEntity.name) private bannerModule: Model<BannerEntity>) { }

    async getAll(skip: number, limit: number, status: boolean) {

        try {
            let find = {};

            if (status) {
                find = {
                    ...find,
                    status
                }
            }
            if (skip && limit) {

                const res = await this.bannerModule.find(find).skip(skip * limit).limit(limit).sort({ createdAt: -1 });
                const total = await this.bannerModule.find(find);
                return response(200, res, skip, limit, total.length)
            } else {

                const res = await this.bannerModule.find(find).sort({ createdAt: -1 });
                return response(200, res)
            }
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: BannerDto) {

        try {

            const res = await this.bannerModule.create(body);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(_id: string) {

        try {

            const res = await this.bannerModule.findByIdAndDelete(_id)
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async detail(_id: string) {

        try {

            const res = await this.bannerModule.findById(_id)
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async update(_id: string, body: BannerDto) {

        try {

            const res = await this.bannerModule.findByIdAndUpdate(_id, body)
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}