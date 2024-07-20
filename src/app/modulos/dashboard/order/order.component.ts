import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  order: Order[] = [];
  listaVacia: string | undefined;


  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.order = data;
        this.fetchUserNames();
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes Ordenes disponibles';
        console.error(error);
      }
    );
  }

  fetchUserNames(): void {
    this.order.forEach(order => {
      this.orderService.getUserById(order.userId).subscribe(
        (userData: any) => {
          order.userName = userData.nombreUsuario; // Asegúrate de que la propiedad sea la correcta
        },
        (error: any) => {
          console.error(`Error obteniendo información del usuario ${order.userId}`, error);
        }
      );
    });
  }

  borrar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta cotizacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí Borrala',
      cancelButtonText: 'No la quiero conservar',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success mr-4',
      },
      buttonsStyling: false,
      reverseButtons: true,
      iconHtml: '<i class="fas fa-exclamation-triangle"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.delete(id).subscribe(() => {
          this.cargarOrdenes();
          Swal.fire({
            title: 'cotizacion eliminada',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se ha borrado la cotizacion',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      }
    });
  }
}
