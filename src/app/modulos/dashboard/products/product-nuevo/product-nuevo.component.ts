import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-product-nuevo',
  templateUrl: './product-nuevo.component.html',
  styleUrls: ['./product-nuevo.component.css']
})
export class ProductNuevoComponent {

  nombre = '';
  precio = 0;
  descripcion = '';

  constructor(
    private productoService: ProductosService,
    private toastr: ToastrService,
    private router: Router
    ) { }



  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio, this.descripcion);
    this.productoService.save(producto).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.volver();
      },
      (err:any) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/products']);
  }


}
