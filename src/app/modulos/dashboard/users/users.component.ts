import { Component } from '@angular/core';
import { NuevoUsuarioDto } from 'src/app/models/nuevo-usuario.dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usuario: NuevoUsuarioDto[] = [];
  listaVacia: string | undefined;
  isAdmin = true;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.isAdmin = this.tokenService.isAdmin() ?? false;
  }

  cargarUsuarios(): void {
    this.authService.lista().subscribe(
      (data: NuevoUsuarioDto[]) => {
        this.usuario = data;
        this.listaVacia = undefined;
      },
      () => {
        this.listaVacia = 'No hay Usuarios';
      }
    );
  }

  borrar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si elimina la cita no podra recuperarla',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.authService.delete(id).subscribe(() => {
          this.cargarUsuarios();
          Swal.fire('OK', 'Usuario eliminado', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Se conserva el Usuario', 'error');
      }
    });
  }

}
