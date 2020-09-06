import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { Product } from './products.model'

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
      ) {}

    async insertProduct(title: string, description: string, price: number) {
        let product = new this.productModel({
            title,
            description,
            price
        });
        product = await product.save();
        return product;
    }

    async getProducts() {
        const products = await this.productModel.find().select('-__v').exec();
        return products;
    }

    async getProduct(id: string) {
        const product = await this.findProduct(id);
        return product ;
    }

    async updateProduct(id: string, title: string, description: string, price: number) {
        const updateProduct = {
            ...title && {title},
            ...description && {description},
            ...price && {price}   
        };
        try {
            const options = { new: true };
            const product = await this.productModel.findByIdAndUpdate(id, updateProduct, options).select('-__v');
            if(!product) {
                throw new NotFoundException('Could not found product.');
            }
            return product;
        } catch (error) {
            if(error instanceof Error.CastError) {
                throw new BadRequestException('Invalid product id.');
            }
            throw error
        }
    }

    async deleteProduct(id: string) {
        try {
            const product = await this.productModel.findByIdAndDelete(id);
            if(!product) {
                throw new NotFoundException('Could not found product.');
            }   
        } catch (error) {
            if(error instanceof Error.CastError) {
                throw new BadRequestException('Invalid product id.');
            }
            throw error;
        }
    }

    private async findProduct(id: string) {
        try {
            const product = await this.productModel.findById(id).select('-__v');
            if(!product) {
                throw new NotFoundException('Could not found product.');
            }
            return product;
        } catch(error) {
            if(error instanceof Error.CastError) {
                throw new BadRequestException('Invalid product id.');
            }
            throw error;
        }
    }
}
