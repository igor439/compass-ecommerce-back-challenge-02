import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Stock_Keeping_Unit } from './entities/stock_keeping_unit.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Product,Stock_Keeping_Unit])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductsModule {}
