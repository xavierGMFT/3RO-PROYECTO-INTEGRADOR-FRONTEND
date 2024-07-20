import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/productoInterface';
import { CartService } from 'src/app/services/cart.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { products } from 'src/assets/data';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productList: Product[] = products;
  filteredProducts: Product[] = [];
  searchTerm = '';

  constructor(
    private tiendaService: TiendaService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productList = this.tiendaService.getProducts();
    this.filteredProducts = this.productList;
  }

  openProductDetails(product: Product) {
    this.router.navigate(['product', product.id]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  searchProducts() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.productList;
    } else {
      this.filteredProducts = this.productList.filter((product) =>
        product.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }



}

