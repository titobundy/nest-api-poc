import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
        ) {
        return await this.productsService.insertProduct(title, description, price);
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();

        return products;

        // return products.map((prod) => ({ 
        //     id: prod.id, title: prod.title, description: prod.description, price: prod.price
        // }));
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return await this.productsService.getProduct(id);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
        ) {
            return await this.productsService.updateProduct(id, title, description, price);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        await this.productsService.deleteProduct(id);
    }
}
