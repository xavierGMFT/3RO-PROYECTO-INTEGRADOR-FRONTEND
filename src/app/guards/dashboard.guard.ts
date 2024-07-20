/* eslint-disable @typescript-eslint/no-unused-vars */
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verifica que el token esté definido
    if (!this.tokenService.getToken()) {
      // Si el token no está definido, redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/pages/login']);
      return false;
    }

    const isAdmin = this.tokenService.isAdmin();
    if (!isAdmin) {
      // Si el usuario no es administrador, redirige al usuario a la página principal
      this.router.navigate(['/pages/order']);
      return false;
    }

    return true;
  }
}
