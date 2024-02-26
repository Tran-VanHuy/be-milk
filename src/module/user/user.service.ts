import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserEntity } from "./user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { response } from "src/response/response";

@Injectable()
export class UserService {

    constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) { }

    async findOne(userId: string){

        try {
            
            const res = await this.userModel.findOne({userId: userId});
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

                const body = { ...data };
                const res = await this.userModel.create(body);
                return response(200, res);
            }
        } catch (error) {

            return response(500, error);
        }
    }

    async createAddress(data: UserDto){
        
        try {

            const res = await this.userModel.findOneAndUpdate({userId: data.userId}, {address: data.address});
            if(res){
                return response(200, data)
            } else {
                throw new HttpException('Không tồn tại user', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}