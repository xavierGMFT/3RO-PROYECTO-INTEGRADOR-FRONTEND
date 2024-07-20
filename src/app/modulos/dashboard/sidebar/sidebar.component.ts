import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent implements OnInit {

  nombreUsuario ='';
  isLogged      = true;
  isAdmin       = true;

  constructor(
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    this.nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
  }

  logOut(): void {
    this.tokenService.logOut();
  }

}
