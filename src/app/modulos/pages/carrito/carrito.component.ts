import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productoInterface';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

}
