import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';
import { ProductDetalleComponent } from './products/product-detalle/product-detalle.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductNuevoComponent } from './products/product-nuevo/product-nuevo.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './order/order.component';
import { EditComponent } from './order/edit/edit.component';
import { DetailComponent } from './order/detail/detail.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    MainComponent,
    ProductsComponent,
    ProductDetalleComponent,
    ProductEditComponent,
    ProductNuevoComponent,
    OrderComponent,
    EditComponent,
    DetailComponent,
    UsersComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule

  ]
})
export class DashboardModule { }
