import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Order } from '../models/order';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  base = environment.URL;
  orderURL = `${this.base}order/`;
  authURL = `${this.base}auth/`

  constructor(private httpClient: HttpClient,  private productoService: ProductosService) {}

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.authURL}${id}`);
  }

  createOrder(order: Order): Observable<any> {
    return this.httpClient.post<any>(`${this.orderURL}`, order);
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.orderURL}`);
  }

  getOrderDetail(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.orderURL}${id}`);
  }

  updateOrder(id: string, order: Order): Observable<any> {
    return this.httpClient.patch<any>(`${this.orderURL}${id}`, order);
  }

  getOrdersWithUserNames(): Observable<Order[]> {
    return this.getOrders().pipe(
      switchMap((orders: Order[]) => {
        const userRequests = orders.map(order => this.getUserById(order.userId));
        return forkJoin(userRequests).pipe(
          map((userResponses: any[]) => {
            return orders.map((order, index) => ({
              ...order,
              userName: userResponses[index].nombreUsuario,
            }));
          })
        );
      })
    );
  }

  getOrderDetalle(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.orderURL}${id}`).pipe(
      switchMap((order: Order) => {
        const userRequest = this.getUserById(order.userId);

        if (order.products) {
          const productRequests = order.products.map(product => this.productoService.detail(product.id));

          return forkJoin([userRequest, forkJoin(productRequests)]).pipe(
            map(([user, productDetails]) => {
              return {
                ...order,
                userName: user.nombreUsuario,
                productDetails: productDetails,
              };
            })
          );
        } else {
          return forkJoin([userRequest]).pipe(
            map(([user]) => {
              return {
                ...order,
                userName: user.nombreUsuario,
                productDetails: [],
              };
            })
          );
        }
      })
    );
  }
  
  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.orderURL}${id}`);
  }

}
