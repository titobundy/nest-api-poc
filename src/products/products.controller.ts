import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
        ): any {
        return {
            id: this.productsService.insertProduct(title, description, price)
        };
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
        ) {
            return this.productsService.updateProduct(id, title, description, price);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        this.productsService.deleteProduct(id);
    }
}
