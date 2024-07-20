import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderProduct } from 'src/app/models/order';
import { Producto } from 'src/app/models/producto';
import { OrderService } from 'src/app/services/order.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-editar',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  orderEdit: Order = {
    userId: '',
    date: '',
    products: [],
    price: 0,
  };


  selectedProductId: string = '';
  selectedQuantity: number = 1;
  productos: Producto[] = [];
  listaVacia: string | undefined;

  constructor(
    private orderService: OrderService,
    private productoService: ProductosService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderEdit.userId = this.tokenService.getUsuarioId() || '';
    this.cargarProductos();
    this.cargarOrden();
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

  cargarOrden(): void {
    const orderId = this.route.snapshot.params['id'];
    this.orderService.getOrderDetail(orderId).subscribe(
      (data: Order) => {
        this.orderEdit = data;

        if (!this.orderEdit.products) {
          this.orderEdit.products = [];
        }

        this.selectedProductId = '';
        this.selectedQuantity = 1;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  addOrUpdateProduct() {
    const existingProductIndex = this.orderEdit.products.findIndex(product => product.id === this.selectedProductId);

    if (existingProductIndex !== -1) {
      // Si el producto ya existe, actualizar la cantidad
      this.orderEdit.products[existingProductIndex].quantity = this.selectedQuantity;
    } else {
      // Si el producto no existe, agregar uno nuevo
      const orderProduct: OrderProduct = {
        id: this.selectedProductId,
        quantity: this.selectedQuantity,
      };

      this.orderEdit.products.push(orderProduct);
    }

    this.selectedProductId = '';
    this.selectedQuantity = 1;
  }

  removeProduct(index: number) {
    this.orderEdit.products.splice(index, 1);
  }

  submitOrder() {
    this.orderService.updateOrder(this.route.snapshot.params['id'], this.orderEdit).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'COTIZACION EDITADA', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/order']);
  }
}
