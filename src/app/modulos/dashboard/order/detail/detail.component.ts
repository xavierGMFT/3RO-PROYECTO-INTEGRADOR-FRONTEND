// Importa los módulos necesarios
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  order: Order = {
    userId: '',
    userName: '',
    date: '',
    products: [],
    productDetails: [],
    price: 0
  };

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrderDetalle(id).subscribe(
      (data: Order) => {
        console.log('Order data:', data);
        this.order = data;
      },
      (err: any) => {
        console.error('Error:', err);
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }


  getQuantity(productId: string): number {
    if (!productId) {
      // Manejar el caso en que productId es undefined o una cadena vacía
      return 0;
    }

    const productInOrder = this.order.products.find(p => p.id === productId);
    return productInOrder ? productInOrder.quantity : 0;
  }

  volver(): void {
    this.router.navigate(['/dashboard/order']);
  }
}
