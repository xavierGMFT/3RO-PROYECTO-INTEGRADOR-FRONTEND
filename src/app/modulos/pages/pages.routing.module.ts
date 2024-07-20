import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ContactenosComponent } from "./contactenos/contactenos.component";
import { NoticiasComponent } from "./noticias/noticias.component";
import { ProductsComponent } from "./products/products.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { ProductDetailComponent } from "./products-detail/product-detail.component";
import { OrderComponent } from "./order/order.component";

const routes: Routes = [
  {
    path: 'pages', component: PagesComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent },
      {path: 'contactenos', component: ContactenosComponent },
      {path: 'nosotros', component: NoticiasComponent},
      {path: 'tienda', component: ProductsComponent  },
      {path: 'product/:id', component: ProductDetailComponent  },
      {path: 'carrito', component: CarritoComponent},
      {path: 'order', component: OrderComponent},
      {path:'', redirectTo:'/pages', pathMatch:'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
