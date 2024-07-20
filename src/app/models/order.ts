import { Producto } from "./producto";

export interface Order {
  id?: string;
  userId: string;
  userName?: string;
  date: string;
  products: OrderProduct[];
  price: number;
  productDetails?: Producto[];
}

export interface OrderProduct {
  id: string;
  quantity: number;
}
