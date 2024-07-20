import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioDto } from 'src/app/models/login-usuario.dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: LoginUsuarioDto = new LoginUsuarioDto('', '');
  nombreUsuario = '';
  password = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  onLogin(): void {
    this.usuario = new LoginUsuarioDto(this.nombreUsuario, this.password);
    this.authService.login(this.usuario).subscribe(
      data => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        } else {
          this.tokenService.setToken(data.token);
          const isAdmin = this.tokenService.isAdmin();
          if (isAdmin === null) {
            // Error al obtener el rol del token
            this.toastrService.error('Error al obtener el rol del usuario', 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          } else if (isAdmin) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/pages/order']);
          }
        }
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
