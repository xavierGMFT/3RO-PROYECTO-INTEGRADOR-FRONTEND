import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './modulos/pages/pages.routing.module';
import { DashboardRoutingModule } from './modulos/dashboard/dashboard.routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
