import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  nombreUsuario = '';

  constructor(
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
  }

}
