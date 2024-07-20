import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductDetailComponent } from './products-detail/product-detail.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    NoticiasComponent,
    ContactenosComponent,
    PagesComponent,
    CarritoComponent,
    ProductDetailComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ]
})
export class PagesModule { }
