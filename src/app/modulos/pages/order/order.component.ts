import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderProduct } from 'src/app/models/order';
import { Producto } from 'src/app/models/producto';
import { OrderService } from 'src/app/services/order.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  order: Order = {
    userId: '',
    date: '',
    products: [],
    price: 0
  };

  selectedProductId: string = '';
  selectedQuantity: number = 1;
  productos: Producto[] = [];
  listaVacia: string | undefined;
  isLogged = true;
  nombreUsuario ='';

  constructor(
    private orderService: OrderService,
    private productoService: ProductosService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.order.userId = this.tokenService.getUsuarioId() || '';
    this.cargarProductos();
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    this.nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
  }

  getProductById(productId: string): Producto | undefined {
    return this.productos.find((product) => product.id === productId);
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes Productos disponibles';
        console.error(error);
      }
    );
  }


  addProductToOrder(productId: string, quantity: number) {
    const orderProduct: OrderProduct = {
      id: productId,
      quantity: quantity,
    };

    this.order.products.push(orderProduct);
  }

  removeProduct(index: number) {
    this.order.products.splice(index, 1);
  }

  isValidProduct(): boolean {
    return this.selectedProductId !== '' && this.selectedQuantity > 0;
  }

  submitOrder() {
    this.orderService.createOrder(this.order).subscribe(
      (data: any) => {
        console.log('creado');
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
      },
      (err: any) => {
        console.log('no creado');
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
  volver(): void {
    this.router.navigate(['/pages/tienda']);
  }
}
