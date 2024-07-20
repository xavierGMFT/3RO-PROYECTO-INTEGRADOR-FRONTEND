import { Injectable } from '@angular/core';
import { products } from '../../assets/data';
import { Product } from '../models/productoInterface';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  productList: Product[] = [];
  filteredProducts: Product[] = [];

  constructor() {
    this.productList = products;
  }

  searchProducts(searchTerm: string) {
    this.filteredProducts = this.productList.filter(product =>
      product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getFilteredProducts() {
    return this.filteredProducts;
  }

  getProducts(): Product[] {
    return this.productList;
  }

  getProductById(id: number) {
    return this.productList.find(product => product.id === id);
  }
}
