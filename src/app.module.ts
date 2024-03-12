import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { CategoryProductsModule } from './module/category-products/category-products.module';
import { ProductsModule } from './module/products/products.module';
import { AddressEntity } from './module/address/address.schema';
import { UploadModule } from './module/upload/upload.module';
import { AddressModule } from './module/address/address.module';
import { VoucherModule } from './module/voucher/voucher.module';
import { BannerModule } from './module/banner/banner.module';
import { AdsModule } from './module/ads/ads.module';
import { OrderModule } from './module/order/order.module';
import { CartModule } from './module/cart/cart.module';
import { FavouriteModel } from './module/favourite/favourite.module';
import { NotificationModule } from './module/notification/notification.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    CategoryProductsModule,
    ProductsModule,
    AddressModule,
    UploadModule,
    VoucherModule,
    BannerModule,
    AdsModule,
    OrderModule,
    CartModule,
    FavouriteModel,
    NotificationModule
  ]
})
export class AppModule { }
