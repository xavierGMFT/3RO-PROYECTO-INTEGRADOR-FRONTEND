import { NuevoUsuarioDto } from './../models/nuevo-usuario.dto';
import { Observable } from 'rxjs';
import { LoginUsuarioDto } from './../models/login-usuario.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenDto } from '../models/token.dto';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = environment.URL;
  authURL = `${this.base}auth/`

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<NuevoUsuarioDto[]> {
    return this.httpClient.get<NuevoUsuarioDto[]>(`${this.authURL}`);
  }

  public detail(id: string): Observable<NuevoUsuarioDto> {
    return this.httpClient.get<NuevoUsuarioDto>(`${this.authURL}${id}`);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.authURL}${id}`);
  }

  registro(dto: NuevoUsuarioDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', dto);
  }

  login(dto: LoginUsuarioDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', dto);
  }

  refresh(dto: TokenDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'refresh', dto);
  }
}
