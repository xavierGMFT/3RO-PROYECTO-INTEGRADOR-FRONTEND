import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/productoInterface';
import { TiendaService } from 'src/app/services/tienda.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product | undefined;
  id!: number;
  message ='';

  constructor(private route: ActivatedRoute, private productService: TiendaService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      this.product = this.productService.getProductById(productId);
      window.scrollTo(0, 0);
    });
  }

  receiveMessage(message: string) {
    this.message = message;
  }


}
