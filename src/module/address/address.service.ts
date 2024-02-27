import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AddressEntity } from "./address.schema";
import { Model } from "mongoose";
import { AddressDto } from "./dto/address.dto";
import { response } from "src/response/response";
import { UserEntity } from "../user/user.schema";
import { AddressDetailDto } from "./dto/address-delete.dto";

@Injectable()
export class AddressService {

    constructor(
        @InjectModel(AddressEntity.name) private addressModel: Model<AddressEntity>,
        @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>
    ) { }

    async create(body: AddressDto) {

        try {


            const addressUser = await this.userModel.findOne({ userId: body.userId })
            if (addressUser) {

                let newAddress = [];
                const res = await this.addressModel.create(body);
                if (body.default) {
                    
                    const findAddressNotDefault = await this.addressModel.find({ userId: body.userId, default: true, _id: { $ne: res._id} })
                    Promise.resolve(findAddressNotDefault).then(async (values) => {
                            
                        values.map(async (item) => {
                            
                           await this.addressModel.findByIdAndUpdate(item.id, {default: false});
                        })
                         
                    })

                    const newfind = await this.userModel.findOne({ userId: body.userId })
                    newAddress = [res._id, ...newfind.address]

                } else {

                    const newfind = await this.userModel.findOne({ userId: body.userId })
                    newAddress = [res._id, ...newfind.address]
                }

                await this.userModel.findOneAndUpdate({ userId: body.userId }, { address: newAddress })
                return response(200, res);

            } else {

                throw new HttpException("User không tồn tại", HttpStatus.BAD_REQUEST)
            }

        } catch (error) {

            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(body: AddressDetailDto){

        const {userId, _id} = body;
        try {
            
            const res = await this.addressModel.findOneAndDelete({userId: userId, _id});
            return response(200, res);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
            
        }
    }

    async detail(body: AddressDetailDto){

        const {userId, _id} = body;
        try {
            
            const res = await this.addressModel.findOne({userId: userId, _id});
            return response(200, res);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
            
        }
    }

    async update(_id: string, body: AddressDto){

        try {
            
            const res = await this.addressModel.findOneAndUpdate({userId: body.userId, _id: _id}, body);
            return response(200, res);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
            
        }
    }
}