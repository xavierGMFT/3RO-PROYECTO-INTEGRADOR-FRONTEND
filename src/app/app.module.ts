import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { DashboardModule } from './modulos/dashboard/dashboard.module';
import { PagesModule } from './modulos/pages/pages.module';
import { SharedModule } from './modulos/shared/shared.module';
import { interceptorProvider } from './interceptors/producto.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DashboardModule,
    PagesModule,
    SharedModule
  ],

  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
