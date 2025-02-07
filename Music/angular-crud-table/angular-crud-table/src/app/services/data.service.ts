import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private products: Product[] = [
  ];

  private productSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productSubject.asObservable();

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productSubject.next(this.products);
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
    this.productSubject.next(this.products);
  }
}
