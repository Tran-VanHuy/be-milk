import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NotificationEntity } from "./notification.schema";
import { Model } from "mongoose";
import { NotificationDto } from "./dto/notification.dto";
import { response } from "src/response/response";
import { UserEntity } from "../user/user.schema";

@Injectable()
export class NotificationService {

    constructor(@InjectModel(NotificationEntity.name) private notificationModel: Model<NotificationEntity>,
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>) { }

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
}