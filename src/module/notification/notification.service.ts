import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NotificationEntity } from "./notification.schema";
import { Model } from "mongoose";
import { NotificationDto } from "./dto/notification.dto";
import { response } from "src/response/response";

@Injectable()
export class NotificationService {

    constructor(@InjectModel(NotificationEntity.name) private notificationModel: Model<NotificationEntity>) { }

    async getAll() {

        try {

            const res = await this.notificationModel.find();
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: NotificationDto) {

        try {

            const res = await this.notificationModel.create(body);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}