import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { CategoryProductsModule } from './module/category-products/category-products.module';
import { ProductsModule } from './module/products/products.module';
import { AddressEntity } from './module/address/address.schema';
import { UploadModule } from './module/upload/upload.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  UserModule,
  CategoryProductsModule,
  ProductsModule,
  AddressEntity,
  UploadModule
]
})
export class AppModule {}
