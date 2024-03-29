import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NotificationEntity, NotificationOrderEntity } from "./notification.schema";
import { Model } from "mongoose";
import { NotificationDto } from "./dto/notification.dto";
import { response } from "src/response/response";
import { UserEntity } from "../user/user.schema";
import { NotificationOrderDto } from "./dto/notification-order.dto";

@Injectable()
export class NotificationService {

    constructor(@InjectModel(NotificationEntity.name) private notificationModel: Model<NotificationEntity>,
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
        @InjectModel(NotificationOrderEntity.name) private notificationOrderModel: Model<NotificationOrderEntity>) { }

    async getAll(userId: string) {

        try {

            let find = {};
            if (userId) {
                find = {
                    ...find,
                    users: { $in: [userId] }
                }
            }
            const res = await this.notificationModel.find(find);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async create(body: NotificationDto) {

        try {

            let user = [];
            if (body.allUser) {
                user = await this.userModel.find().select({ userId: 1 });
            } else {

                user = body.users
            }

            const newbody = {
                ...body,
                users: body.allUser ? user?.map((item) => item.userId) : user
            }
            const res = await this.notificationModel.create(newbody);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(_id: string) {

        try {

            const res = await this.notificationModel.findByIdAndDelete(_id);
            return response(200, res)

        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async createNotificationOrder(body: NotificationOrderDto) {

        try {

            const res = await this.notificationOrderModel.create(body)
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)

        }
    }

    async getAllNotificationOrder(userId: string) {

        try {
            let find = {}
            const findUser = await this.userModel.findOne({ userId })
            if (findUser.role !== "ADMIN") {

                find = {
                    ...find,
                    userId
                }
            } else {
                find = {
                    ...find,
                    userId: "ADMIN"
                }
            }
            const res = await this.notificationOrderModel.find(find).sort({ createdAt: -1 })
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)

        }
    }

    async checkReadNotiOrder(_id: string) {

        try {

            const res = await this.notificationOrderModel.findByIdAndUpdate(_id, { readed: true })
            return response(200, res)
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async detail(_id: string) {

        try {

            const res = await this.notificationModel.findById(_id);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async update(_id: string, body: NotificationDto) {

        try {

            const res = await this.notificationModel.findByIdAndUpdate(_id, body);
            return response(200, res)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}