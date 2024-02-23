import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { CategoryProductsModule } from './module/category-products/category-products.module';
import { ProductsModule } from './module/products/products.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  UserModule,
  CategoryProductsModule,
  ProductsModule
]
})
export class AppModule {}
