import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserEntity } from "./user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { response } from "src/response/response";
import { AddressEntity } from "../address/address.schema";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { infoUser } from "src/common/infoUser";

@Injectable()
export class UserService {

    constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
        private jwtServiccee: JwtService) { }

    async getAll() {

        try {

            const res = await this.userModel.find().populate({
                path: "address",
                model: AddressEntity.name
            })
            const newRes = res.map(item => ({
                ...item.toObject(),
                address: item.address.find(item => item.default === true)
            }))
            return response(200, newRes)
        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async findOne(userId: string) {

        try {

            const res = await this.userModel.findOne({ userId: userId }).populate({
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
            const findUser = await this.userModel.findOne({ userId: data.userId })
            if (findUser) {
                return response(200, "Đã tồn tại");
            } else {

                const body: UserDto = { ...data, address: [] };
                const res = await this.userModel.create(body);
                return response(200, res);
            }
        } catch (error) {

            return response(500, error);
        }
    }

    async signIn(body: SignInDto) {

        try {

            const res = await this.userModel.findOne({ userId: body.userId })
            if (!res) {

                throw new UnauthorizedException()
            }

            const payload = { _id: res.role, userId: res.userId, name: res.name, role: res.role }
            return {
                status: 200,
                message: 'Thành công',
                data: { accessToken: await this.jwtServiccee.signAsync(payload) }
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async changeNoti(req: any) {

        try {
            const userId = infoUser(req);
            await this.userModel.findOneAndUpdate({ userId: userId.userId }, { notification: false })
            return response(200, null)


        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)

        }
    }
}