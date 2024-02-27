import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserEntity } from "./user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { response } from "src/response/response";
import { AddressEntity } from "../address/address.schema";

@Injectable()
export class UserService {

    constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) { }

    async findOne(userId: string){

        try {
            
            const res = await this.userModel.findOne({userId: userId}).populate({
                path: 'address',
                model: AddressEntity.name,
            });;
            return response(200, res);
        } catch (error) {
            return response(500, error);
        }
    }

    async create(data: UserDto) {

        try {
            const findUser = await this.userModel.findOne({userId: data.userId})
            if(findUser){
                return response(200, "Đã tồn tại");
            } else {

                const body: UserDto = { ...data, address: []};
                const res = await this.userModel.create(body);
                return response(200, res);
            }
        } catch (error) {

            return response(500, error);
        }
    }
}