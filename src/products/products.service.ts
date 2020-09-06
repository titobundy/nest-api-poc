import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const prodId = new Date().getTime().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(id: string) {
        const product = this.findProduct(id);
        return { ...product } ;
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        let product = this.findProduct(id);
        if(title) {
            product.title = title;
        }
        if(description) {
            product.description = description;
        }
        if(price) {
            product.price = price;
        }
        return product;
    }

    deleteProduct(id: string) {
        let product = this.findProduct(id);
        this.products = this.products.filter((prod) => prod.id != id);
    }

    private findProduct(id: string) {
        const product = this.products.find((prod) => prod.id === id);
        if(!product) {
            throw new NotFoundException('Could not found product.');
        }
        return product;
    }

}
