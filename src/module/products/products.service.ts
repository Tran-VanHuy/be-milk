import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductsDocument, ProductsEntity } from "./products.schema";
import { Model } from "mongoose";
import { ProductsDto } from "./dto/products.dto";
import { response } from "src/response/response";
import { CategoryProductsEntity } from "../category-products/category-products.schema";
import { formatPrice } from "src/common/format-price";
import { log } from "console";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(ProductsEntity.name) private readonly productModel: Model<ProductsDocument>) { }

    async getAll(skip: number, limit: number, status: boolean) {

        try {
            let find = {};
            if (status) {

                find = { status: status }
            }
            const res = await this.productModel.find(find).populate({
                path: 'categories',
                model: CategoryProductsEntity.name
            }).skip(skip * limit).limit(limit || 10).sort({ createdAt: 1 })
            const total = (await this.productModel.find()).length
            return response(200, res, skip, limit, total)
        } catch (error) {

            return response(500, error)
        }
    }

    async create(body: ProductsDto) {

        try {

            const res = await this.productModel.create(body);
            return response(200, res)
        } catch (error) {

            return response(500, error)
        }
    }

    async findById(_id: string) {

        try {
            const res = await this.productModel.findById(_id);

            if (res) {
                let priceTitle = "";

                const priceMS = res?.info && res?.info?.itemMS?.map(item =>
                    item.price - (item.price * (item.discount / 100))
                )

                const mapItemSZ = res?.info?.itemMS?.map(item =>
                    item.itemSZ.map((item) => item.price - (item.price * (item.discount / 100)))
                ).flat()


                const priceSZ = mapItemSZ && mapItemSZ.length > 0 && mapItemSZ.map(item => item)

                const price = res.price && res.price - (res.price * (res.discount / 100))
                console.log("price", res.price);


                if (priceSZ && priceSZ.length > 0) {
                    console.log("vào đây 1");
                    console.log("priceSZ", priceSZ);

                    const maxPriceSZ = formatPrice(Math.max(...priceSZ))
                    const minPriceSZ = formatPrice(Math.min(...priceSZ))
                    priceTitle = maxPriceSZ !== minPriceSZ ? `${minPriceSZ} - ${maxPriceSZ}` : maxPriceSZ

                    const newRes = {
                        ...res.toObject(),
                        priceTitle,
                        checkDiscount: maxPriceSZ === minPriceSZ ? true : false
                    }
                    return response(200, newRes)
                }
                if (priceMS && priceMS.length > 0) {
                    console.log("vào đây 2");

                    const maxPriceMS = formatPrice(Math.max(...priceMS))
                    const minPriceMS = formatPrice(Math.min(...priceMS))
                    priceTitle = maxPriceMS !== minPriceMS ? `${minPriceMS} - ${maxPriceMS}` : maxPriceMS
                    const newRes = {
                        ...res.toObject(),
                        priceTitle,
                        checkDiscount: maxPriceMS === minPriceMS ? true : false
                    }
                    return response(200, newRes)
                }

                if (price) {
                    console.log("vào đây 3");


                    priceTitle = formatPrice(price)
                    const newRes = {
                        ...res.toObject(),
                        priceTitle,
                        checkDiscount: price === res.price ? true : false
                    }
                    return response(200, newRes)
                }

            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY)
        }
    }
}