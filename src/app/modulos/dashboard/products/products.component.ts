import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  productos: Producto[] = [];
  listaVacia: string | undefined;


  constructor(
    private productoService: ProductosService,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
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

  borrar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí Borralo',
      cancelButtonText: 'No lo quiero conservar',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success mr-4',
      },
      buttonsStyling: false,
      reverseButtons: true,
      iconHtml: '<i class="fas fa-exclamation-triangle"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id).subscribe(() => {
          this.cargarProductos();
          Swal.fire({
            title: 'Producto eliminado',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se ha borrado el producto',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      }
    });
  }
}
