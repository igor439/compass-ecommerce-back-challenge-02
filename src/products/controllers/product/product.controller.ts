import { Controller ,Get , Param, Query} from '@nestjs/common';
import { ProductService } from 'src/products/services/product/product.service';

@Controller('products')
export class ProductController {

    constructor(private producService:ProductService){}

    @Get()
    getProductList(@Query('page') page: number){

        return this.producService.getCardProducts(page);

    }

    @Get('product/:id')
    getProduct(@Param('id') id:string){

    }

    @Get('filter')
    getProductListByCategory(@Query('category') category:string,@Query('page') page: number,@Query('pageSize') pageSize: number){
        
        return  this.producService.getCardProductsByFilter(category,page,pageSize)

    }

    @Get('getProducts')
    getProductListByArrayOfCategory(@Query('category1') category1:string,@Query('category1') category2:string,@Query('category3') category3:string,@Query('page') page: number,@Query('pageSize') pageSize: number){
        
        return  this.producService.getProductListByArrayOfCategory(category1,category2,category3,page,pageSize)

    }

    @Get('filters')
    getCategory(){
        return this.producService.getCardProductsFilters()
    }






}
