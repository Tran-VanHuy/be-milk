import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "./user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { response } from "src/response/response";

@Injectable()
export class UserService {

    constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) { }

    async create(data: UserDto) {

        try {
            const findUser = await this.userModel.findOne({userId: data.userId})
            if(findUser){
                return response(200, "Đã tồn tại");
            } else {

                const body = { ...data };
                const res = await this.userModel.create(body);
                return response(200, res);
            }
        } catch (error) {

            return response(500, error);
        }
    }
}