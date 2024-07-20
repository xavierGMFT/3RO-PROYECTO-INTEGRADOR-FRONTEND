import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

    producto: Producto ={
    nombre: '',
    precio: 0,
    descripcion: ''
  };
    constructor(
      private productoService: ProductosService,
      private activatedRoute: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router
    ) { }

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params['id'];
      this.productoService.detail(id).subscribe(
        (data: any) => {
          this.producto = data;
        },
        (err: any) => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          this.volver();
        }
      );
    }

    onUpdate(): void {
      const id = this.activatedRoute.snapshot.params['id'];
      this.productoService.update(id, this.producto).subscribe(
        (data: any) => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.volver();
        },
        (err: any) => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
    }
    volver(): void {
      this.router.navigate(['/dashboard/products']);
    }


}
